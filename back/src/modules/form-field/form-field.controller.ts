import { Body, Controller, HttpStatus, Param, Patch, Req, Res } from '@nestjs/common';
import { ePermission } from 'src/tools/enum/permission.definition';
import { UpdateFormFieldDto } from './dto/update-formField.dto';
import { Response, Request } from 'express';
import { FormFieldService } from './form-field.service';

@Controller('form-fields')
export class FormFieldController {
    constructor(private formFieldService: FormFieldService) { }

    @Patch(':formFieldId')
    async updateFormField(@Body() formField: UpdateFormFieldDto, @Param() params: any, @Res() res: Response, @Req() req: Request) {
        const userPermission: ePermission = req.user['permission'];
        const formFieldId: string = params['formFieldId'];
        formField.id = formFieldId;

        if (userPermission != ePermission.internalEmployee) {
            res.status(HttpStatus.UNAUTHORIZED).send();
            return;
        }

        await this.formFieldService.updateFormField(formField, res);
        res.send();
    }
}
