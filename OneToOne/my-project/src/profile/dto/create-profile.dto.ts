import { IsNumber, IsString, } from "class-validator";

export class CreateProfileDto {

  @IsString()
  bio: string;

  @IsNumber()
  Experence: number;

  @IsNumber()
  userId: number;

}
