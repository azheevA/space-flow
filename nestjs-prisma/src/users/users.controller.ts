import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Post,
  UseInterceptors,
  UploadedFile,
  MaxFileSizeValidator,
  ParseFilePipe,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard, type SessionData } from 'src/auth/auth.guard';
import { sessionInfo } from 'src/auth/session-info.decorator';
import { UpdateProfileDto } from './users.dto';
import { PhotoService } from 'src/photo/photo.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { GetSessionInfoDto } from 'src/auth/auth.dto';
import { UserDto } from './dto/create-user.dto';

const multerOptions = {
  storage: diskStorage({
    destination: './user-uploads',
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      callback(null, `avatar-${uniqueSuffix}${extname(file.originalname)}`);
    },
  }),
};

@ApiTags('Users')
@Controller('users')
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }),
)
export class UserController {
  constructor(
    private readonly userService: UsersService,
    private readonly photoService: PhotoService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Получить всех пользователей' })
  findAll() {
    return this.userService.users({});
  }
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: UserDto })
  @Get('me')
  async getMe(@sessionInfo() session: SessionData): Promise<UserDto> {
    const user = await this.userService.user({ id: session.id });
    if (!user) {
      throw new UnauthorizedException('Invalid session');
    }
    const { hash: _hash, salt: _salt, ...userWithoutSecrets } = user;
    return userWithoutSecrets as UserDto;
  }
  @Patch('me')
  @UseGuards(AuthGuard)
  @ApiConsumes('multipart/form-data')
  updateProfile(
    @Body() dto: UpdateProfileDto,
    @sessionInfo() session: SessionData,
  ) {
    return this.userService.updateUser({
      where: { id: session.id },
      data: dto,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить одного пользователя' })
  findOne(@Param('id') id: string) {
    return this.userService.user({ id: +id });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить пользователя' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser({
      where: { id: +id },
      data: updateUserDto,
    });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить пользователя' })
  remove(@Param('id') id: string) {
    return this.userService.deleteUser({ id: +id });
  }

  @Post('upload')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Загрузка аватара пользователя' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async uploadAvatar(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 })],
      }),
    )
    file: Express.Multer.File,
    @sessionInfo() session: GetSessionInfoDto,
  ) {
    console.log('Текущий ID пользователя из сессии:', session.id);
    return await this.photoService.addUserPhoto(session.id, file);
  }
}
