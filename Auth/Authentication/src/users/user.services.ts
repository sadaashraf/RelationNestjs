
import { userEntity } from "./user.entity"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { CreateUserDto } from "./user.dto"
import { Injectable, NotFoundException } from "@nestjs/common"
import { UpdateUserDto } from "./update.user.dto"

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

  async findAll(age?: number) {

    // agar age di ho → filter
    if (age) {
      return this.userRepo.find({
        where: { age: Number(age) },
      });
    }

    // agar age na ho → sab users
    return this.userRepo.find();
  }
  // findAll() {
  //   return this.userRepo.find()
  // }
  async getUserByName(username: string) {
    const user = await this.userRepo.findOne(
      {
        where: { username }
      })
    if (!user) {
      throw new NotFoundException("user not found")
    }
    return user;
  }
  async findOne(id: number) {
    const user = await this.userRepo.findOne({
      where: { id }
    });
    if (!user) {
      throw new NotFoundException("user not found");
    }
    return user;
  }
  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException("user not found");
    }
    Object.assign(user, updateUserDto);
    return this.userRepo.save(user);
  }

  async remove(id: number) {
    const user = await this.userRepo.findOneBy({ id })
    if (!user) {
      return new NotFoundException('id not found')

    }
    await this.userRepo.remove(user)
    return {
      message: "deleted successfully"
    }
  }
}