import { IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';
import { v4 as uuid } from 'uuid';

export class CreateAccountDto {
  @IsNotEmpty()
  @Min(0)
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsUUID()
  account_id: uuid;
}
