import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserController } from './users.controller';
import { AccountModule } from 'src/account/account.module';
import { BlockListModule } from 'src/block-list/block-list.module';
import { PhotoModule } from 'src/photo/photo.module';

@Module({
  exports: [UsersService],
  imports: [PrismaModule, AccountModule, BlockListModule, PhotoModule],
  providers: [UsersService],
  controllers: [UserController],
})
export class UsersModule {}
