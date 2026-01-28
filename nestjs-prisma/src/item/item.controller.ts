import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { ItemService } from './item.service';
import { CreateItemDto, PaginatedItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

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
  @ApiOkResponse({
    type: PaginatedItemDto,
    description: 'Список всех айтемов с контентом',
  })
  findAllItems(
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 8,
    @Query('search') search?: string,
    @Query('sort') sort?: string,
  ) {
    return this.itemService.items(page, limit, search, sort);
  }
  @Get(':id')
  @ApiOperation({ summary: 'Получить один айтем' })
  @ApiOkResponse({ type: CreateItemDto })
  findOneItem(@Param('id') id: string) {
    return this.itemService.post(+id);
  }
  @Patch(':id')
  @ApiOperation({ summary: 'Обновить один айтем' })
  @ApiBody({ type: UpdateItemDto })
  updateItem(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemService.updateItem({
      where: { id: Number(id) },
      data: updateItemDto,
    });
  }
  @Delete(':id')
  @ApiOperation({ summary: 'Удалить айтем' })
  removeItem(@Param('id') id: string) {
    return this.itemService.deleteItem(+id);
  }
}
