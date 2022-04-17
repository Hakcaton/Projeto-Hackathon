import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormField } from './entities/form-field.entity';
import { FormFieldController } from './form-field.controller';
import { FormFieldService } from './form-field.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FormField]),
  ],
  controllers: [FormFieldController],
  providers: [FormFieldService],
  exports: [TypeOrmModule, FormFieldService]
})
export class FormFieldModule {}
