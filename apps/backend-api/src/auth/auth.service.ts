import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { BasicResponse } from '../common/dto/basic-response.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) { }

  async login(email: string, password: string): Promise<AuthEntity> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('User not found!');
    }

    if (!user.emailVerfiedAt) {
      throw new UnauthorizedException('User not verified!');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password!');
    }

    return {
      accessToken: this.jwtService.sign(
        {
          userId: user.id,
          role: user.role,
          name: user.name,
          email: user.email,
        }
      ),
    };
  }

  async verify(id: number): Promise<BasicResponse> {
    const now = new Date();
    await this.prisma.user.update({
      where: { id },
      data: {
        lastActivityAt: now,
        emailVerfiedAt: now
      },
    })

    return {
      message: 'User verified, please login...'
    }
  }
}
