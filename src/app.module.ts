import { Module } from '@nestjs/common';
import { DocumentsModule } from './documents/documents.module';
import { ClientsModule } from './clients/clients.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './clients/entities/client.entity';
import { Document } from './documents/entities/document.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_DATABASE || 'testdb',
      entities: [Client, Document],
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    ClientsModule,
    DocumentsModule,
  ],
})
export class AppModule {}
