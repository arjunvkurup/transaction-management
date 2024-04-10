import { Module } from '@nestjs/common';
import { TransactionModule } from './transaction/transaction.module'; // Import TransactionModule
import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [
    TransactionModule, // Add TransactionModule to imports array
  ],
  controllers: [AppController], // Define controllers if any
  providers: [AppService], // Define providers if any
})
export class AppModule { }
