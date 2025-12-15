import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepo: Repository<Post>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) { }
  async create(createPostDto: CreatePostDto) {
    const user = await this.userRepo.findOne({ where: { id: createPostDto.userId } });
    if (!user) throw new NotFoundException('User not found');


    const post = this.postRepo.create({ title: createPostDto.title, user });
    return this.postRepo.save(post);
  }

  findAll() {
    return this.postRepo.find({ relations: ['user', 'comment'] })
  }

  async findOne(id: number) {
    const post = await this.postRepo.findOne({ where: { id }, relations: ['user', 'commment'] });
    if (!post) throw new NotFoundException("post not found");
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.findOne(id);
    Object.assign(post, updatePostDto)
    return this.postRepo.save(post);

  }

  async remove(id: number) {
    const post = await this.findOne(id);
    return this.postRepo.remove(post);

  }
}
