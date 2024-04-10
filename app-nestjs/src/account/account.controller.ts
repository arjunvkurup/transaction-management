import {
  Param,
  Controller,
  Get,
  HttpStatus,
  Res,
  Post,
  Body,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { v4 as uuid } from 'uuid';
import { CreateAccountDto } from './dto/account.create.dto';
import { Response } from 'express';

@Controller('api/v1/accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) { }
  /**
   * creates a new account with the provided account_id and amount.
   *
   * @param createAccountDto javascript object containing the account_id and amount for the new account
   * @param res response object
   */
  @Post()
  createAccount(
    @Body() createAccountDto: CreateAccountDto,
    @Res() res: Response,
  ) {
    res
      .status(HttpStatus.CREATED)
      .send(
        this.accountService.createAccount(
          createAccountDto.account_id,
          createAccountDto.amount,
        ),
      );
  }

  /**
   * method for retrieving an account by its account_id.
   * returns a 400 status code if the account_id is missing or incorrect.
   * returns a 404 status code if the account is not found.
   * returns a 200 status code and the account as the response if the account is found.
   *
   * @param account_id - UUID of the account to retrieve
   * @param res - Express.js response object
   */
  @Get(':account_id')
  getAccountById(@Param('account_id') account_id: uuid, @Res() res: Response) {
    if (!account_id) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .send('account_id missing or has incorrect type.');
    } else if (!this.accountService.getAccountById(account_id)) {
      res.status(HttpStatus.NOT_FOUND).send('Account not found');
    } else {
      res
        .status(HttpStatus.OK)
        .json(this.accountService.getAccountById(account_id));
    }
  }
}
