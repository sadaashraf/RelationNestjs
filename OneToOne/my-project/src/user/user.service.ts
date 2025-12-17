import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) { }

  async create(userdto: CreateUserDto) {
    try {
      const user = this.userRepo.create(userdto);
      return await this.userRepo.save(user);
    } catch (error) {
      throw new InternalServerErrorException('User are not created');
    }

  }

  findAll() {
    return this.userRepo.find({ relations: ['profile'] })
  }

  findOne(id: number) {
    return this.userRepo.findOne({
      where: { id },
      relations: ['profile']
    })
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.findOne(
      { where: { id } }
    );
    if (!user) {
      throw new NotFoundException('User not found');
    }

    Object.assign(user, updateUserDto);
    return this.userRepo.save(user);

  }

  remove(id: number) {
    return this.userRepo.delete(id);
  }
}
