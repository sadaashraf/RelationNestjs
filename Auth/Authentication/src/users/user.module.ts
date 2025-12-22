import { Module } from '@nestjs/common';
import { UserServices } from './user.services';

@Module({
  imports: [],
  controllers: [],
  providers: [UserServices],
})
export class UserModule { }
