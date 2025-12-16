

import { Profile } from "src/profile/entities/profile.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => Profile, profile => profile.user)
  profile: Profile;
}
