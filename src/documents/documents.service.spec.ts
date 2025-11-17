import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { Document } from './entities/document.entity';
import { Client } from '../clients/entities/client.entity';

describe('DocumentsService', () => {
  let service: DocumentsService;
  let documentRepository: Repository<Document>;
  let clientRepository: Repository<Client>;

  const mockDocumentRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
  };

  const mockClientRepository = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DocumentsService,
        {
          provide: getRepositoryToken(Document),
          useValue: mockDocumentRepository,
        },
        {
          provide: getRepositoryToken(Client),
          useValue: mockClientRepository,
        },
      ],
    }).compile();

    service = module.get<DocumentsService>(DocumentsService);
    documentRepository = module.get<Repository<Document>>(
      getRepositoryToken(Document),
    );
    clientRepository = module.get<Repository<Client>>(
      getRepositoryToken(Client),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  it('deve lançar um erro quando arquivo não for fornecido', async () => {
    await expect(service.uploadPDF(undefined, 1)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('deve lançar um erro quando cliente não for encontrado', async () => {
    const mockFile = {
      mimetype: 'application/pdf',
      buffer: Buffer.from('test'),
    } as Express.Multer.File;

    mockClientRepository.findOne.mockResolvedValue(null);

    await expect(service.uploadPDF(mockFile, 999)).rejects.toThrow(
      NotFoundException,
    );
  });
});
