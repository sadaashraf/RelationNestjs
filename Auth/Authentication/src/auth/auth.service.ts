import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { userEntity } from "src/users/user.entity";

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) { }

  generateToken(user: userEntity): string {
    const payload =
    {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role
    };
    return this.jwtService.sign(payload);
  }
};