import { ApiProperty } from '@nestjs/swagger';

export class UploadPhotoDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;

  @ApiProperty({ description: 'Id предмета', example: 1 })
  itemId: string;
}
