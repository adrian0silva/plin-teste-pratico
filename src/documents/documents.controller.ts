import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  UseInterceptors,
  UploadedFile,
  ParseIntPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentsService } from './documents.service';
import { ProcessUrlDto } from './dto/process-url.dto';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post('upload-pdf/:clientId')
  @UseInterceptors(FileInterceptor('file'))
  async uploadPDF(
    @UploadedFile() file: Express.Multer.File,
    @Param('clientId', ParseIntPipe) clientId: number,
  ) {
    return this.documentsService.uploadPDF(file, clientId);
  }

  @Post('process-url')
  async processWebUrl(@Body() processUrlDto: ProcessUrlDto) {
    return this.documentsService.processWebUrl(
      processUrlDto.url,
      processUrlDto.clientId,
    );
  }

  @Get()
  async findAll() {
    return this.documentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.documentsService.findOne(id);
  }
}
