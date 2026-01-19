import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from 'generated/prisma/client';
import type { Item } from 'generated/prisma/client';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService) {}

  private readonly defaultInclude = {
    content: true,
    photos: true,
    author: {
      select: { name: true, email: true },
    },
  };

  async createItem(dto: CreateItemDto): Promise<Item> {
    const { content, authorId, title, published } = dto;

    const data: Prisma.ItemCreateInput = {
      title,
      published,
      author: authorId ? { connect: { id: authorId } } : undefined,
      content: content ? { create: content } : undefined,
    };
    return this.prisma.item.create({
      data,
      include: this.defaultInclude,
    });
  }

  async updateItem(params: {
    where: Prisma.ItemWhereUniqueInput;
    data: UpdateItemDto;
  }): Promise<Item> {
    const { where, data } = params;
    const { content, ...rest } = data;

    return this.prisma.item.update({
      where,
      data: {
        ...rest,
        content: content
          ? {
              upsert: {
                create: content,
                update: content,
              },
            }
          : undefined,
      },
      include: this.defaultInclude,
    });
  }

  async post(id: number): Promise<Item | null> {
    return this.prisma.item.findUnique({
      where: { id },
      include: this.defaultInclude,
    });
  }

  async items(params: {
    skip?: number;
    take?: number;
    where?: Prisma.ItemWhereInput;
  }): Promise<Item[]> {
    return this.prisma.item.findMany({
      ...params,
      include: this.defaultInclude,
    });
  }

  async deleteItem(id: number): Promise<Item> {
    return this.prisma.item.delete({
      where: { id },
    });
  }
}
