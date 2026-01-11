import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'test@test.com', description: 'Email of the user' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty({ example: 'John Doe', description: 'Name of the user' })
  @IsString()
  @IsOptional()
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  @MaxLength(50, { message: 'Name must be less 50 characters long' })
  name: string;

  @ApiProperty({ example: '13123213' })
  @IsString()
  hash: string;

  @ApiProperty({ example: '13123213' })
  @IsString()
  salt: string;
}
