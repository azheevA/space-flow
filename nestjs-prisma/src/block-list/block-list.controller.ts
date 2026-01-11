import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BlockListService } from './block-list.service';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import {
  AddBlockItemDto,
  BlockItemDto,
  BlockListDto,
  BlockListQueryDto,
} from './block-list.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { sessionInfo } from 'src/auth/session-info.decorator';
import { GetSessionInfoDto } from 'src/auth/auth.dto';

@Controller('block-list')
export class BlockListController {
  constructor(private readonly blockListService: BlockListService) {}
  @Get()
  @ApiOkResponse({ type: BlockListDto })
  @UseGuards(AuthGuard)
  getList(
    @Query() query: BlockListQueryDto,
    @sessionInfo() session: GetSessionInfoDto,
  ) {
    return this.blockListService.getByUser(session.id, query);
  }
  @Post('item')
  @ApiCreatedResponse({ type: BlockItemDto })
  addBlockItem(
    @Body() body: AddBlockItemDto,
    @sessionInfo() session: GetSessionInfoDto,
  ) {
    return this.blockListService.addItem(session.id, body);
  }

  @Delete('item/:id')
  @ApiOkResponse({
    type: BlockItemDto,
  })
  removeBlockItem(
    @Param(ParseIntPipe) id: number,
    @sessionInfo() session: GetSessionInfoDto,
  ) {
    return this.blockListService.removeItem(session.id, id);
  }
}
