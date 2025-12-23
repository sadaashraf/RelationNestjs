import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { userEntity } from "src/users/user.entity";
import { UserServices } from "src/users/user.services";

@Injectable()
export class PassportLocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userServices: UserServices) {
    super();
  }
  async validate(username: string, password: string): Promise<userEntity> {
    const user = await this.userServices.getUserByName(username);
    if (user && user.password === password) {
      return user;
    }
    throw new UnauthorizedException('Invalid username or password')

  }
}