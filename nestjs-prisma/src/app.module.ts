import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ItemModule } from './item/item.module';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';
import { BlockListModule } from './block-list/block-list.module';
import { PhotoModule } from './photo/photo.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    ItemModule,
    AuthModule,
    AccountModule,
    BlockListModule,
    PhotoModule,
  ],
})
export class AppModule {}
