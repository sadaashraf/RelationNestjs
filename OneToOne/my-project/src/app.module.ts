import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { Profile } from './profile/entities/profile.entity';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'relationdb',
      entities: [User, Profile],
      synchronize: true,
    }),
    UserModule,
    ProfileModule,
  ],
})
export class AppModule { }
