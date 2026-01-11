import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateItemDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  id: number;

  @ApiProperty({ example: 'Заголовок', description: 'Заголовок статьи' })
  @IsString()
  @MinLength(3, { message: 'Заголовок слишком короткий' })
  @MaxLength(20, { message: 'Заголовок слишком длинный' })
  title: string;

  @ApiProperty({
    example: 'Содержание статьи',
    description: 'Содержание статьи',
  })
  @IsString()
  @IsOptional()
  @MaxLength(100, { message: 'Текст слишком длинный' })
  content?: string;

  @ApiProperty({ example: true, description: 'Опубликована ли статья' })
  @IsBoolean()
  @IsOptional()
  published?: boolean;

  @ApiProperty({ example: 1, description: 'ID автора статьи' })
  @IsInt()
  @IsOptional()
  authorId?: number;
}
