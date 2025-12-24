import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth/auth.service";
import { RoleGuard } from "./role.gard";


@Controller("app")
export class AppController {
  constructor(private readonly authService: AuthService) { }

  @Post('/login')
  @UseGuards(AuthGuard('local'))
  login(@Request() req) {
    return this.authService.generateToken(req.user);
  }

  @Get('/app-developer')
  @UseGuards(AuthGuard('jwt'), new RoleGuard('CONSTANTS.ROLLES.ANDROID_DEVELOPER'))
  getDeveloperProfile(@Request() req) {
    return 'this is a android developer profile' + JSON.stringify(req.user);
  }

  @Get('/web-developer')
  @UseGuards(AuthGuard('jwt'), new RoleGuard('CONSTANTS.ROLLES.WEB_DEVELOPER'))
  getWebDeveloperProfile(@Request() req) {
    return 'this is a web developer profile' + JSON.stringify(req.user);
  }
}