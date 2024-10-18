import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';

export class UpdateDictionaryDto {
  @IsOptional()
  @Length(1, 255)
  @IsString()
  key?: string;

  @IsOptional()
  @IsString()
  @Length(1, 255)
  value?: string;

  @IsOptional()
  @IsBoolean()
  enable?: boolean;

  @IsOptional()
  @IsString()
  description?: string;
}
