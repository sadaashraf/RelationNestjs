import { IsNumber, IsOptional, IsPositive } from "class-validator"

export class Pagenation {
  @IsNumber()
  @IsOptional()
  @IsPositive()
  skip: number = 0
  @IsNumber()
  @IsOptional()
  @IsPositive()
  limit: number = 10
}