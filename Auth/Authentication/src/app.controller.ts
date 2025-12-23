import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth/auth.service";


@Controller("app")
export class AppController {
  constructor(private readonly authService: AuthService) { }

  @Post('/login')
  @UseGuards(AuthGuard('local'))
  async login(@Request() req) {
    return await this.authService.generateToken(req.user);
  }
}