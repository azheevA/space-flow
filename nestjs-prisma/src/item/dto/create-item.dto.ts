import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
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
export class PhotoRecordDto {
  @ApiProperty({ example: 'https://storage.com/photo1.jpg' })
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiProperty({ example: 'abc-123.jpg' })
  @IsString()
  @IsNotEmpty()
  filename: string;

  @ApiProperty({ example: 'my_cat.jpg' })
  @IsString()
  @IsNotEmpty()
  originalName: string;
}
export class CreateItemDto {
  @ApiProperty({ example: 1 })
  @IsOptional()
  @IsNumber()
  id?: number;

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

  @ApiProperty({
    type: [PhotoRecordDto],
    description: 'Список данных о загруженных фотографиях',
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PhotoRecordDto)
  photos?: PhotoRecordDto[];

  @ApiProperty({ example: '2024-01-20T10:30:00Z', required: false })
  @IsOptional()
  @IsDate()
  createdAt?: Date;
}
