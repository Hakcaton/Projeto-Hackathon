import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { UpdateFormFieldDto } from './dto/update-formField.dto';
import { FormField } from './entities/form-field.entity';
import { Response } from 'express';
import { eError } from 'src/tools/enum/error.definition';
import { DatabaseError } from 'pg-protocol';

@Injectable()
export class FormFieldService {

    constructor(@InjectRepository(FormField) private formFieldRepository: Repository<FormField>){}

    async updateFormField(formField: UpdateFormFieldDto, res: Response): Promise<void> {
        try {
            const registeredFormField = await this.formFieldRepository.findOne({ id: formField.id });

            if (!registeredFormField) {
                throw eError.RESOURCE_NOT_FOUND;
            }

            if (formField.subtitle) {
                registeredFormField.subtitle = formField.subtitle;
            }

            if (formField.title) {
                registeredFormField.title = formField.title;
            }

            await this.formFieldRepository.save(registeredFormField);

            res.status(HttpStatus.OK);
        }
        catch (err) {
            if (!res) {
                throw err;
            }

            if (err instanceof QueryFailedError) {
                const error = err.driverError as DatabaseError;
                switch (error.code) {
                    case 'ER_DUP_ENTRY': {
                        res.status(HttpStatus.CONFLICT);
                        break;
                    }

                    default: {
                        res.status(HttpStatus.BAD_REQUEST);
                        break;
                    }
                }
            }
            else {
                switch (err) {
                    case eError.RESOURCE_NOT_FOUND: {
                        res.status(HttpStatus.NOT_FOUND);
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
