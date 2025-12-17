import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ProfileService {

  constructor(
    @InjectRepository(Profile)
    private readonly profilerepo: Repository<Profile>,
    @InjectRepository(User)
    private readonly userrepo: Repository<User>
  ) { }
  async create(createProfileDto: CreateProfileDto) {
    try {
      const { bio, age, userId } = createProfileDto
      const user = await this.userrepo.findOne({ where: { id: userId } })
      if (!user) {
        throw new NotFoundException("User not found")
      }
      const profile = this.profilerepo.create(createProfileDto);
      return await this.profilerepo.save(profile)
    } catch (error) {
      throw new InternalServerErrorException('Profile is not created');
    }
  }

  findAll() {
    return this.profilerepo.find({ relations: ['user'] })
  }

  findOne(id: number) {
    return this.profilerepo.findOne({
      where: { id },
      relations: ['user'],
    })
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    const profile = this.profilerepo.findOne(
      { where: { id } }
    );
    if (!profile)
      throw new NotFoundException("Profile not found")

  }

  remove(id: number) {

  }
}
