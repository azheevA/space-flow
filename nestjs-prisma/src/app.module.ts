import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ItemModule } from './item/item.module';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';

import { PhotoModule } from './photo/photo.module';
import { EmailModule } from './email/email.module';
import { PhotoController } from './photo/photo.controller';
import { ItemService } from './item/item.service';
import { PhotoService } from './photo/photo.service';
import { ItemController } from './item/item.controller';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    ItemModule,
    AuthModule,
    AccountModule,
    PhotoModule,
    EmailModule,
  ],
  controllers: [ItemController, PhotoController],
  providers: [ItemService, PhotoService],
})
export class AppModule {}
