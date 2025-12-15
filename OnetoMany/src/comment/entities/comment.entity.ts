import { Post } from "src/post/entities/post.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment {

  @PrimaryGeneratedColumn()
  id: number;


  @Column()
  text: string;


  @ManyToOne(() => User, user => user.comments)
  user: User;


  @ManyToOne(() => Post, post => post.comments)
  post: Post;
}
