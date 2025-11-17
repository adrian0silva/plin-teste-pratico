import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientsService } from './clients.service';
import { Client } from './entities/client.entity';

describe('ClientsService', () => {
  let service: ClientsService;
  let repository: Repository<Client>;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientsService,
        {
          provide: getRepositoryToken(Client),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ClientsService>(ClientsService);
    repository = module.get<Repository<Client>>(getRepositoryToken(Client));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a client', async () => {
    const clientData = { name: 'Test Client', email: 'test@example.com' };
    const createdClient = { id: 1, ...clientData };

    mockRepository.create.mockReturnValue(createdClient);
    mockRepository.save.mockResolvedValue(createdClient);

    const result = await service.create(clientData);

    expect(mockRepository.create).toHaveBeenCalledWith(clientData);
    expect(mockRepository.save).toHaveBeenCalledWith(createdClient);
    expect(result).toEqual(createdClient);
  });

  it('should return all clients with documents count', async () => {
    const clients = [
      {
        id: 1,
        name: 'Client 1',
        email: 'client1@example.com',
        documents: [{ id: 1 }, { id: 2 }],
      },
      {
        id: 2,
        name: 'Client 2',
        email: 'client2@example.com',
        documents: [],
      },
    ];

    mockRepository.find.mockResolvedValue(clients);

    const result = await service.findAll();

    expect(result).toHaveLength(2);
    expect(result[0].documentsCount).toBe(2);
    expect(result[1].documentsCount).toBe(0);
  });

  it('should find one client with documents count', async () => {
    const client = {
      id: 1,
      name: 'Test Client',
      email: 'test@example.com',
      documents: [{ id: 1 }, { id: 2 }],
    };

    mockRepository.findOne.mockResolvedValue(client);

    const result = await service.findOne(1);

    expect(result).toBeDefined();
    expect(result?.documentsCount).toBe(2);
  });
});
