import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ItemModule } from './item/item.module';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';
import { BlockListModule } from './block-list/block-list.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    ItemModule,
    AuthModule,
    AccountModule,
    BlockListModule,
  ],
})
export class AppModule {}
