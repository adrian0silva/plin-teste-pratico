import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './entities/document.entity';
import { Client } from 'src/clients/entities/client.entity';
import * as path from 'path';
import { execFile } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs/promises';
import * as os from 'os';
import * as crypto from 'crypto';
const execFileAsync = promisify(execFile);

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private documentsRepo: Repository<Document>,
    @InjectRepository(Client)
    private clientsRepo: Repository<Client>,
  ) {}

  async uploadPDF(file: any, clientId: number) {
    if (!file) {
      throw new BadRequestException('Arquivo PDF é obrigatório');
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (file.mimetype !== 'application/pdf') {
      throw new BadRequestException('Arquivo deve ser um PDF');
    }
    const client = await this.clientsRepo.findOne({ where: { id: clientId } });
    if (!client) {
      throw new NotFoundException('Cliente não encontrado');
    }
    // criar arquivo temporário
    const tmpDir = os.tmpdir();
    const tmpName = `upload-${Date.now()}-${crypto.randomBytes(6).toString('hex')}.pdf`;
    const tmpPath = path.join(tmpDir, tmpName);
    try {
      // salvar buffer em arquivo temporário
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const fileBuffer = file.buffer as Buffer;
      await fs.writeFile(tmpPath, fileBuffer);
      // chamar script Python: passe o caminho do arquivo temporário
      const pythonScript = path.join(
        __dirname,
        '../../scripts/pdf_extractor.py',
      );
      const pythonVenv = '/opt/venv/bin/python3';

      const { stdout, stderr } = await execFileAsync(pythonVenv, [
        pythonScript,
        tmpPath,
      ]);
      if (stderr) {
        // Python pode enviar warnings para stderr — trate conforme seu caso
        console.warn('python stderr:', stderr);
      }
      const result = JSON.parse(stdout) as { title?: string; content?: string };
      const doc = this.documentsRepo.create({
        title: result.title || 'Sem título',
        content: result.content || '',
        source: 'pdf',
        client,
      });
      return await this.documentsRepo.save(doc);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Erro desconhecido';
      throw new BadRequestException('Erro ao processar PDF: ' + errorMessage);
    } finally {
      // tenta apagar o arquivo temporário
      try {
        await fs.unlink(tmpPath);
      } catch (e) {
        console.log(e);
      }
    }
  }

  async processWebUrl(url: string, clientId: number) {
    if (!url || !url.startsWith('http')) {
      throw new BadRequestException('URL inválida');
    }
    const client = await this.clientsRepo.findOne({ where: { id: clientId } });
    if (!client) {
      throw new NotFoundException('Cliente não encontrado');
    }
    try {
      const pythonScript = path.join(__dirname, '../../scripts/web_scraper.py');
      const pythonVenv = '/opt/venv/bin/python3';
      // Usar execFileAsync é mais seguro e evita shell injection
      const { stdout, stderr } = await execFileAsync(pythonVenv, [
        pythonScript,
        url,
      ]);
      if (stderr) {
        console.warn('webscraper stderr:', stderr);
      }
      let result: { title?: string; content?: string };
      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        result = JSON.parse(stdout);
      } catch (e) {
        console.error('Falha ao converter JSON:', stdout);
        console.log(e);
        throw new Error('Resposta inválida do scraper');
      }
      const doc = this.documentsRepo.create({
        title: result.title?.trim() || 'Sem título',
        content: result.content?.trim() || '',
        source: 'web',
        client,
      });
      return this.documentsRepo.save(doc);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Erro desconhecido';
      throw new BadRequestException('Erro ao processar URL: ' + errorMessage);
    }
  }

  async findAll() {
    return this.documentsRepo.find({
      relations: ['client'],
      order: { processedAt: 'DESC' },
    });
  }

  async findOne(id: number) {
    const document = await this.documentsRepo.findOne({
      where: { id },
      relations: ['client'],
    });

    if (!document) {
      throw new NotFoundException('Documento não encontrado');
    }

    return document;
  }
}
