import { IsNotEmpty, IsNumber, IsString, } from "class-validator";

export class CreateProfileDto {

  @IsString()
  bio: string;

  @IsNumber()
  age: number;

  @IsNumber()
  @IsNotEmpty()
  userId: number;

}
