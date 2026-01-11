import { Module } from '@nestjs/common';
import { BlockListService } from './block-list.service';
import { BlockListController } from './block-list.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BlockListController],
  providers: [BlockListService],
  exports: [BlockListService],
})
export class BlockListModule {}
