
import { userEntity } from "./user.entity"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { CreateUserDto } from "./user.dto"
import { Injectable } from "@nestjs/common"

@Injectable()
export class UserServices {
  constructor(
    @InjectRepository(userEntity)
    private readonly userRepo: Repository<userEntity>,
  ) { }
  create(userdto: CreateUserDto) {
    const user = this.userRepo.create(userdto)
    return this.userRepo.save(user)
  }
  getUserByName(username: string) {
    return this.userRepo.findOne(
      {
        where: { username }
      })
  }
}


