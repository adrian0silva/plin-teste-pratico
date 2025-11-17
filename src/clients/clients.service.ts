import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientsRepo: Repository<Client>,
  ) {}

  async create(clientData: Partial<Client>) {
    const exists = await this.clientsRepo.findOne({
      where: { email: clientData.email },
    });

    if (exists) {
      throw new ConflictException('O e-mail informado já está cadastrado.');
    }
    const client = this.clientsRepo.create(clientData);
    return this.clientsRepo.save(client);
  }

  async findAll() {
    const clients = await this.clientsRepo.find({ relations: ['documents'] });
    return clients.map((client) => ({
      ...client,
      documentsCount: client.documents?.length || 0,
    }));
  }

  async findOne(id: number) {
    const client = await this.clientsRepo.findOne({
      where: { id },
      relations: ['documents'],
    });
    if (client) {
      return {
        ...client,
        documentsCount: client.documents?.length || 0,
      };
    }
    return null;
  }

  async update(id: number, data: Partial<Client>) {
    await this.clientsRepo.update(id, data);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.clientsRepo.delete(id);
  }
}
