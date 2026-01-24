import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { PasswordService } from './password.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private passwordServiсe: PasswordService,
    private JwtService: JwtService,
  ) {}
  async signUp(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (user) {
      throw new BadRequestException({ type: 'email-exists' });
    }
    const salt = this.passwordServiсe.getSalt();
    const hash = this.passwordServiсe.getHash(password, salt);
    const newUser = await this.userService.createUser(email, hash, salt);
    const accessToken = await this.JwtService.signAsync({
      id: newUser.id,
      email: newUser.email,
    });
    return { accessToken };
  }

  async signIn(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }
    const hash = this.passwordServiсe.getHash(password, user.salt);

    if (hash !== user.hash) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const accessToken = await this.JwtService.signAsync({
      id: user.id,
      email: user.email,
    });
    return { accessToken };
  }

  async changePassword(
    userId: number,
    oldPassword: string,
    newPassword: string,
    confirmNewPassword: string,
  ) {
    if (newPassword !== confirmNewPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    const user = await this.userService.user({ id: userId });

    if (!user) {
      throw new UnauthorizedException();
    }

    const oldHash = this.passwordServiсe.getHash(oldPassword, user.salt);

    if (oldHash !== user.hash) {
      throw new BadRequestException('Old password is incorrect');
    }

    if (oldPassword === newPassword) {
      throw new BadRequestException('New password must be different');
    }

    const newSalt = this.passwordServiсe.getSalt();
    const newHash = this.passwordServiсe.getHash(newPassword, newSalt);

    await this.userService.updateUser({
      where: { id: userId },
      data: {
        salt: newSalt,
        hash: newHash,
      },
    });

    return { success: true };
  }
}
