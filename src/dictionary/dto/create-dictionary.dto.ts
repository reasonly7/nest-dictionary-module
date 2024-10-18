import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateDictionaryDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  category: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  key: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  value: string;

  @IsNotEmpty()
  @IsBoolean()
  enable: boolean;

  @IsOptional()
  @IsString()
  description?: string;
}
