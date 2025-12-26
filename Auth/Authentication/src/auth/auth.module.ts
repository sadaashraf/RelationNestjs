import { Module } from "@nestjs/common";
import { UserModule } from "src/users/user.module";
import { PassportLocalStrategy } from "./passport.local.stratege";
import { PassportModule } from "@nestjs/passport/dist/passport.module";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.stratege";

@Module({
  imports: [UserModule, PassportModule, JwtModule.register({
    secret: 'keyyy',
    signOptions:
      { expiresIn: '1h' }
  })

  ],
  controllers: [],
  providers: [PassportLocalStrategy, JwtStrategy, AuthService],
  exports: [AuthService]
})
export class AuthModule { }