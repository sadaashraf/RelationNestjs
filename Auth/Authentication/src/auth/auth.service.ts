import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { promises } from "dns";
import { userEntity } from "src/users/user.entity";

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) { }
  async generateToken(payload: userEntity): Promise<string> {
    return this.jwtService.sign(payload);
  }
}