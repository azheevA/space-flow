import {
  Controller,
  Post,
  UseInterceptors,
  Body,
  UploadedFiles,
  Delete,
  Param,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiBody, ApiTags, ApiOperation } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { PhotoService } from './photo.service';
import { UploadPhotoDto } from './photo.dto';

@ApiTags('Photos')
@Controller('photos')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadPhotoDto })
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const name = Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, `${name}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadPhoto(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: UploadPhotoDto,
  ) {
    return await this.photoService.AddPhoto(Number(body.itemId), files);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить фотографию по ID' })
  async removePhoto(@Param('id') id: string) {
    return await this.photoService.deletePhoto(Number(id));
  }
}
