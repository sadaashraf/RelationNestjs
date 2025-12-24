import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { userEntity } from "src/users/user.entity";

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) { }
  generateToken(payload: userEntity): string {
    return this.jwtService.sign(payload);
  }
}