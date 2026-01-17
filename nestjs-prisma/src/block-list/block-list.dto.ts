import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { $Enums } from 'generated/prisma/browser';

export class BlockItemDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  blockListid: number;
  @ApiProperty({
    enum: [$Enums.BlockItemType.KeyWord, $Enums.BlockItemType.Website],
  })
  type: $Enums.BlockItemType;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  data: string;
  @ApiProperty()
  createdAt: Date;
}
export class BlockListDto {
  @ApiProperty()
  @IsInt()
  id: number;
  @ApiProperty()
  ownerId: number;
  @ApiProperty({
    type: [BlockItemDto],
  })
  items: BlockItemDto[];
}

export class BlockListQueryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  q?: string;
}

export class AddBlockItemDto {
  @ApiProperty({
    enum: [$Enums.BlockItemType.KeyWord, $Enums.BlockItemType.Website],
  })
  @IsIn([$Enums.BlockItemType.KeyWord, $Enums.BlockItemType.Website])
  type: $Enums.BlockItemType;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  data: string;
}
