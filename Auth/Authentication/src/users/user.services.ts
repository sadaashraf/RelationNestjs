import { Injectable } from "@nestjs/common"
import { userEntity } from "./user.entity"

@Injectable()
export class UserServices {
  public user: userEntity[] = [
    {
      username: 'user1',
      password: 'admin1',
      email: 'user1@example.com',
      age: 24,
      role: 'CONSTANTS.ROLLES.ANDROID_DEVELOPER'
    },
    {
      username: 'user2',
      password: 'admin2',
      email: 'user2@example.com',
      age: 30,
      role: 'CONSTANTS.ROLLES.WEB_DEVELOPER'
    },
    {
      username: 'user3',

      
      password: 'admin3',
      email: 'user3@example.com',
      age: 28,
      role: 'CONSTANTS.ROLLES.ANDROID_DEVELOPER'
    }
  ]
  getUserByName(username: string): userEntity | undefined {
    return this.user.find(user => user.username === username)
  }
}