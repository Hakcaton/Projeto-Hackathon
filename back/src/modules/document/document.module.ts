import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormField } from '../form-field/entities/form-field.entity';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { Document } from './entities/document.entities';

@Module({
    imports: [
        TypeOrmModule.forFeature([Document]),
        TypeOrmModule.forFeature([FormField]),
      ],
      controllers: [DocumentController],
      providers: [DocumentService],
      exports: [TypeOrmModule, DocumentService]
})
export class DocumentsModule {}
