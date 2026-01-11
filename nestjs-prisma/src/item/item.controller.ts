import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('Items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}
  @Post()
  @ApiOperation({ summary: 'Создать все новые айтемы' })
  createItem(@Body() createItemDto: CreateItemDto) {
    if (createItemDto) {
      return this.itemService.createItem(createItemDto);
    }
  }
  @Get()
  @ApiOperation({ summary: 'Получить все айтемы' })
  findAllItems() {
    return this.itemService.items({});
  }
  @Get(':id')
  @ApiOperation({ summary: 'Получить один айтем' })
  findOneItem(@Param('id') id: string) {
    return this.itemService.post({ id: +id });
  }
  @Patch(':id')
  @ApiOperation({ summary: 'Обновить один айтем' })
  updateItem(@Param() updateItemDto: UpdateItemDto) {
    return this.itemService.updateItem({
      where: { id: updateItemDto.id },
      data: updateItemDto,
    });
  }
  @Delete(':id')
  @ApiOperation({ summary: 'Удалить айтем' })
  removeItem(@Param('id') id: string) {
    return this.itemService.deleteItem({ id: +id });
  }
}
