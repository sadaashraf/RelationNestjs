import { User } from "src/user/entities/user.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bio: string;

  @Column()
  age: number;

  @OneToOne(() => User, user => user.profile)
  user: User;

}