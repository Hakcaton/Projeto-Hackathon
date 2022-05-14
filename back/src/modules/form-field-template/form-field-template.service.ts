import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { Repository } from 'typeorm';
import { FormField } from '../form-field/entities/form-field.entity';
import { FormFieldTemplate } from './entities/form-field-template.entity';

@Injectable()
export class FormFieldTemplateService {
    constructor(@InjectRepository(FormFieldTemplate) private formFieldTemplateRepository: Repository<FormFieldTemplate>) { }

    async getFormFieldTemplates(res?: Response): Promise<FormFieldTemplate[]> {
        try {
            const formFieldTemplates: FormFieldTemplate[] = await this.formFieldTemplateRepository.find();

            return formFieldTemplates;
        } catch (err) {
            if (!res) {
                throw err;
            }
            res.status(HttpStatus.BAD_REQUEST);
        }
    }
}
