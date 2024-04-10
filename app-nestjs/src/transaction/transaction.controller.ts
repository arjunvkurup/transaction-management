import {
  Body,
  Param,
  Controller,
  Get,
  Post,
  HttpStatus,
  Res,
  Req,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateAccountDto } from '../account/dto/account.create.dto';
import { v4 as uuid } from 'uuid';
import { Response, Request } from 'express';
import { AccountService } from '../account/account.service';

/**
 * Transaction controller
 * Handles all transaction related requests
 * @class
 * @name TransactionController
 * @public
 * @returns {void}
 */
@Controller('api/v1/transactions')
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly accountService: AccountService,
  ) { }

  /**
   * Method to retrieve all the transaction data, currently stored in the local memory as a list
   * @param res Response of the api
   * @returns Promise
   */
  @Get()
  async getAllTransactions(@Res() res: Response): Promise<void> {
    res
      .status(HttpStatus.OK)
      .json(this.transactionService.getAllTransactions());
  }

  /**
   * method for creating a transaction, the working of the api is in a way that,
   * if the account uuid is not present in the accounts module, then a new account
   * will be created and then the transaction is created. The base amount will also
   * be allocated as the balamce of that account.
   * @param createTransactionDto javascript object containing the parameters
   * @param req request object of the api
   * @param res response object of the apo
   * @example {account_id: "0afd02d3-6c59-46e7-b7bc-893c5e0b7ac2", amount: "100"}
   */
  @Post()
  async createTransaction(
    @Body() createTransactionDto: CreateAccountDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const transaction = await this.transactionService.createTransaction(
        createTransactionDto.account_id,
        createTransactionDto.amount,
      );
      return res.status(HttpStatus.CREATED).json(transaction);
    } catch (error) {
      if (error instanceof TypeError) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .send('Mandatory body parameters missing or have incorrect type');
      } else if (error.message === 'MethodNotAllowedException') {
        return res
          .status(HttpStatus.METHOD_NOT_ALLOWED)
          .send('Specified HTTP method not allowed.');
      } else if (error.message === 'UnsupportedMediaTypeException') {
        return res
          .status(HttpStatus.UNSUPPORTED_MEDIA_TYPE)
          .send('Specified content type not allowed.');
      } else {
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send('Internal server error.');
      }
    }
  }

  /**
   * method to retrieve the transaction details by id
   * @param transaction_id transaction id that should be used for retrieving
   * @param res response object
   */
  @Get(':transaction_id')
  async getTransactionById(
    @Param('transaction_id') transaction_id: uuid,
    @Res() res: Response,
  ) {
    if (!transaction_id) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .send('transaction_id missing or has incorrect type.');
    } else if (!this.transactionService.getTransactionById(transaction_id)) {
      res.status(HttpStatus.NOT_FOUND).send('Transaction not found');
    } else {
      res
        .status(HttpStatus.OK)
        .send(this.transactionService.getTransactionById(transaction_id));
    }
  }
}
