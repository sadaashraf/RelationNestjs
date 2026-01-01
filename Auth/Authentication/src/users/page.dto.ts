import { IsNumber, IsOptional, IsPositive } from "class-validator"

export class Pagenation {
  @IsNumber()
  @IsOptional()
  @IsPositive()
  skip: Number
  @IsNumber()
  @IsOptional()
  @IsPositive()
  limit: Number
}