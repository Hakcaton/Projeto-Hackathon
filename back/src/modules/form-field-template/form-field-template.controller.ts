import { Body, Controller, Get, HttpStatus, Param, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ePermission } from 'src/tools/enum/permission.definition';
import { AddFormFieldTemplateDto } from './dto/add-formFieldTemplate.dto';
import { FormFieldTemplateService } from './form-field-template.service';

@Controller('form-field-templates')
export class FormFieldTemplateController {
    constructor(private formFieldTemplateService: FormFieldTemplateService) { }

    @Get('')
    async getFormFieldTemplates(@Res() res: Response, @Req() req: Request): Promise<void> {
        const userPermission: ePermission = req.user['permission'];

        if (userPermission == ePermission.outsourcedEmployee) {
            res.status(HttpStatus.UNAUTHORIZED).send;
            return;
        }
        res.send(await this.formFieldTemplateService.getFormFieldTemplates(res));
    }

    @Post('')
    async addFormFieldTemplate(@Body() formField: AddFormFieldTemplateDto, @Req() req: Request, @Res() res: Response): Promise<void> {
        const userPermission: ePermission = req.user['permission'];
    
        if (userPermission != ePermission.internalEmployee) {
          res.status(HttpStatus.UNAUTHORIZED).send();
          return;
        }
    
        res.send(await this.formFieldTemplateService.addFormField(formField, res));
      }
}
