import { Controller, Get, HttpStatus, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ePermission } from 'src/tools/enum/permission.definition';
import { FormFieldTemplateService } from './form-field-template.service';

@Controller('form-field-templates')
export class FormFieldTemplateController {
    constructor(private formFieldService: FormFieldTemplateService) { }

    @Get('')
    async getFormFieldTemplates(@Res() res: Response, @Req() req: Request): Promise<void> {
        const userPermission: ePermission = req.user['permission'];

        if (userPermission == ePermission.outsourcedEmployee) {
            res.status(HttpStatus.UNAUTHORIZED).send;
            return;
        }
        res.send(await this.formFieldService.getFormFieldTemplates(res));
    }
}
