import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";


@Controller("app")
export class AppController {
  constructor() { }
  @Post('/login')
  @UseGuards(AuthGuard('local'))
  getHello(@Request() req): string {
    return req.user;
  }
}