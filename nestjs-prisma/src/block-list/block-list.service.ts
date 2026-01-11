import { Injectable } from '@nestjs/common';
import { BlockList } from 'generated/prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';
import { AddBlockItemDto, BlockListQueryDto } from './block-list.dto';
import { BlockItem } from 'generated/prisma/browser';

@Injectable()
export class BlockListService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number): Promise<BlockList> {
    return this.prisma.blockList.create({
      data: { ownerId: userId },
    });
  }

  async getByUser(
    userId: number,
    query: BlockListQueryDto,
  ): Promise<BlockList> {
    return this.prisma.blockList.findUniqueOrThrow({
      where: { ownerId: userId },
      include: {
        items: {
          where: { data: { contains: query.q, mode: 'insensitive' } },
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  }

  async addItem(userId: number, data: AddBlockItemDto): Promise<BlockItem> {
    const blockList = (await this.prisma.blockList.findUniqueOrThrow({
      where: { ownerId: userId },
    })) as { id: number; ownerId: number };
    return this.prisma.blockItem.create({
      data: { blockListId: blockList.id, ...data },
    });
  }

  async removeItem(userId: number, itemId: number): Promise<BlockItem> {
    const blockList = (await this.prisma.blockList.findUniqueOrThrow({
      where: { ownerId: userId },
    })) as { id: number; ownerId: number };
    return this.prisma.blockItem.delete({
      where: {
        blockListId: blockList.id,
        id: itemId,
      },
    });
  }
}
