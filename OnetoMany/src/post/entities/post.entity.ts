import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "src/comment/entities/comment.entity";
@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;


  @Column()
  title: string;


  @ManyToOne(() => User, user => user.posts)
  user: User;

  @OneToMany(() => Comment, comment => comment.post)
  comments: Comment[];
}

