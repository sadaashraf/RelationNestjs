import { Module } from "@nestjs/common";
import { UserModule } from "src/users/user.module";
import { PassportLocalStrategy } from "./passport.local.stratege";

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [PassportLocalStrategy],
})
export class AuthModule { }