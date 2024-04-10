import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('api/v1/ping')
  getPing(@Res() res: Response): void {
    if (this.appService.checkHealth()) {
      res.status(HttpStatus.OK).send();
    } else {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}
