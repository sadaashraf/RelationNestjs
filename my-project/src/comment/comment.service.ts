import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Post } from 'src/post/entities/post.entity';


@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepo: Repository<Comment>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Post) private postRepo: Repository<Post>
  ) { }
  async create(createCommentDto: CreateCommentDto) {
    const { userId, postId, text } = createCommentDto

    const user = await this.userRepo.findOne({ where: { id: userId } })
    if (!user) throw new NotFoundException('User not found')

    const post = await this.postRepo.findOne({ where: { id: postId } });
    if (!post) throw new NotFoundException('post not found');

    // const user = this.userRepo.findOne({ where: { id: createCommentDto.userId } })
    // if (!user) throw new NotFoundException('User not found')
    // const post = this.postRepo.findOne({ where: { id: createCommentDto.postId } });
    // if (!post) throw new NotFoundException('post not found');
    const comment = await this.commentRepo.create({ text, user, post });
    return this.commentRepo.save(comment);
  }

  // async create(createCommentDto: CreateCommentDto) {
  //   const { userId, postId, text } = createCommentDto;

  //   // Validate user
  //   const user = await this.userRepo.findOne({ where: { id: userId } });
  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }

  //   // Validate post
  //   const post = await this.postRepo.findOne({ where: { id: postId } });
  //   if (!post) {
  //     throw new NotFoundException('Post not found');
  //   }

  //   // Create comment with relations
  //   const comment = this.commentRepo.create({
  //     text,
  //     user,
  //     post
  //   });

  //   return this.commentRepo.save(comment);
  // }


  findAll() {
    return `This action returns all comment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
