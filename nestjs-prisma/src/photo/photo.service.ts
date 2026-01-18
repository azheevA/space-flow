import { Injectable, NotFoundException } from '@nestjs/common';
import { Photo } from 'generated/prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PhotoService {
  constructor(private readonly prisma: PrismaService) {}

  async AddPhoto(itemId: number, file: Express.Multer.File): Promise<Photo> {
    const item = await this.prisma.item.findUnique({
      where: { id: itemId },
    });

    if (!item) {
      throw new NotFoundException(`Item с ID ${itemId} не найден`);
    }
    return await this.prisma.photo.create({
      data: {
        url: `/static/${file.filename}`,
        filename: file.filename,
        originalName: file.originalname,
        itemId: itemId,
      },
    });
  }
}
