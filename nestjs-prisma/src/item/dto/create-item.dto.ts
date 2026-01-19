import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
export class CreateContentDto {
  @ApiProperty({ example: 'черная дыра', description: 'Тип небесного тела' })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({
    example: 'сверхмассивная',
    description: 'Сабтип небесного тела',
  })
  @IsString()
  @IsNotEmpty()
  subtype: string;

  @ApiProperty({ example: '390 млрд км', description: 'Размер в км' })
  @IsString()
  @IsNotEmpty()
  size: string;
}

export class CreateItemDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  id: number;

  @ApiProperty({ example: 'TON-618', description: 'название объекта' })
  @IsString()
  @MinLength(3, { message: 'Название слишком короткое' })
  @MaxLength(30, { message: 'Название слишком длинное' })
  title: string;

  @ApiProperty({
    example: {
      type: 'черная дыра',
      subtype: 'сверхмассивная',
      size: '390 млрд км',
    },
    description: 'Данные контента (вложенный объект)',
  })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => CreateContentDto)
  content?: CreateContentDto;

  @ApiProperty({ example: true, description: 'Опубликована ли статья' })
  @IsBoolean()
  @IsOptional()
  published?: boolean;

  @ApiProperty({ example: 1, description: 'ID автора статьи' })
  @IsInt()
  @IsOptional()
  authorId?: number;
}
