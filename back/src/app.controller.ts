import { Controller, Get } from '@nestjs/common';
import { Public } from './tools/auth/constants';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}
}