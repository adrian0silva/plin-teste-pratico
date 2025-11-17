import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { Client } from 'src/clients/entities/client.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from './entities/document.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Document, Client])],
  controllers: [DocumentsController],
  providers: [DocumentsService],
})
export class DocumentsModule {}
