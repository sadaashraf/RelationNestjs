import { Module } from '@nestjs/common';
import { UserServices } from './user.services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { userEntity } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([userEntity])],
  controllers: [],
  providers: [UserServices],
  exports: [UserServices]
})
export class UserModule { }
