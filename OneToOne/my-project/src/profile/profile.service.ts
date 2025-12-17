import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfileService {

  constructor(
    @InjectRepository(Profile)
    private readonly profilerepo: Repository<Profile>
  ) { }
  async create(createProfileDto: CreateProfileDto) {
    try {
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
