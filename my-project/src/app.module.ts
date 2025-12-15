import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { User } from './user/entities/user.entity';
import { Comment } from './comment/entities/comment.entity';
import { Post } from './post/entities/post.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'userdb',
      entities: [User, Comment, Post],
      synchronize: true,
    }),

    UserModule,
    PostModule,
    CommentModule
  ],

})

export class AppModule { }
