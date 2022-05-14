import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormFieldTemplate } from './entities/form-field-template.entity';
import { FormFieldTemplateController } from './form-field-template.controller';
import { FormFieldTemplateService } from './form-field-template.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FormFieldTemplate]),
  ],
  controllers: [FormFieldTemplateController],
  providers: [FormFieldTemplateService],
  exports: [TypeOrmModule, FormFieldTemplateService]
})
export class FormFieldTemplateModule {}
