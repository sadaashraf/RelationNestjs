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
    private readonly userRepo: Repository<User>
  ) { }

  async create(CreateProfileDto: CreateProfileDto) {
    try {
      const user = await this.userRepo.findOne({ where: { id: CreateProfileDto.userId } });
      if (!user) throw new NotFoundException('User not found');

      const { userId, ...profileData } = CreateProfileDto;
      const profile = this.profilerepo.create(
        {
          ...profileData,
          user,
        }
      )
      return this.profilerepo.save(profile);
    } catch (error) {
      throw new InternalServerErrorException("profile data is not created")
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

  async update(id: number, updateProfileDto: UpdateProfileDto) {
    const profile = await this.profilerepo.findOne(
      { where: { id } }
    );
    if (!profile) { throw new NotFoundException("Profile not found") }

    Object.assign(profile, updateProfileDto);
    return this.profilerepo.save(profile);
  }

  remove(id: number) {
    return this.profilerepo.delete(id);
  }
}
