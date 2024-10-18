import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CheckDictionaryDto {
  @IsNotEmpty()
  @IsString()
  category: string;

  @IsOptional()
  @IsString()
  key?: string;
}
