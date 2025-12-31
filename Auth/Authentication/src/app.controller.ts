import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth/auth.service";
import { RoleGuard } from "./role.gard";
import { CONSTANTS } from "./constants";
import { UserServices } from "./users/user.services";
import { CreateUserDto } from "./users/user.dto";
import { UpdateUserDto } from "./users/update.user.dto";


@Controller("app")
export class AppController {
  constructor(private readonly authService: AuthService,
    private readonly userService: UserServices
  ) { }

  @Post()
  create(@Body() CreateUserDto: CreateUserDto) {
    return this.userService.create(CreateUserDto);
  }
  @Post('/login')
  @UseGuards(AuthGuard('local'))
  login(@Request() req) {
    return this.authService.generateToken(req.user);
  }

  @Get('/app-developer')
  @UseGuards(AuthGuard('jwt'), RoleGuard(CONSTANTS.ROLES.ANDROID_DEVELOPER))
  getDeveloperProfile(@Request() req) {
    return 'this is a android developer profile' + JSON.stringify(req.user);
  }

  @Get('/web-developer')
  @UseGuards(AuthGuard('jwt'), RoleGuard(CONSTANTS.ROLES.WEB_DEVELOPER))
  getWebDeveloperProfile(@Request() req) {
    return 'this is a web developer profile' + JSON.stringify(req.user);
  }

  @Get()
  findAll(@Query('age') age?: number) {
    return this.userService.findAll(age);
  }

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  @Get(':id')
  findOn(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

}

// @Get(':username')
// findOne(@Param('username') username: string) {
//   return this.userService.getUserByName(username);
// }