import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { DatabaseError } from 'pg-protocol';
import { eError } from 'src/tools/enum/error.definition';
import { QueryFailedError, Repository } from 'typeorm';
import { FormField } from '../form-field/entities/form-field.entity';
import { AddFormFieldTemplateDto } from './dto/add-formFieldTemplate.dto';
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

    async addFormField(formField: AddFormFieldTemplateDto, res: Response): Promise<FormFieldTemplate> {
        try {

			const newRawFormFieldTemplate: FormFieldTemplate = {...formField} as FormFieldTemplate;
            

			if (formField.subtitle == 1) {
				newRawFormFieldTemplate.description = '<request-date>';
			}
			
			const newFormFieldTemplate: FormFieldTemplate = this.formFieldTemplateRepository.create(newRawFormFieldTemplate);
			await this.formFieldTemplateRepository.save(newFormFieldTemplate);

			return newFormFieldTemplate;
		} catch (err) {
			if (!res) {
				throw err;
			}
			if (err instanceof QueryFailedError) {
				const error = err.driverError as DatabaseError;
				switch (error.code) {
					case "ER_DUP_ENTRY": {
						res.status(HttpStatus.CONFLICT);
						break;
					}

					default: {
						res.status(HttpStatus.BAD_REQUEST);
						break;
					}
				}
			}
		}
    }
}
