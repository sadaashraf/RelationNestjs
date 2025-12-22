import { Injectable } from "@nestjs/common"
import { userEntity } from "./user.entity"

@Injectable()
export class UserServices {
  public user: userEntity[] = [
    {
      username: 'user1',
      password: 'admin1',
      email: 'user1@example.com'
    },
    {
      username: 'user2',
      password: 'admin2',
      email: 'user2@example.com'
    },
    {
      username: 'user3',
      password: 'admin3',
      email: 'user3@example.com'
    }
  ]
  getUserByName(username: string): userEntity | undefined {
    return this.user.find(user => user.username === username)
  }
}