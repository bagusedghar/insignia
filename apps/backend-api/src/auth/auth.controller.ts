import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { AuthEntity } from './entities/auth.entity';
import { RegisterDto } from './dto/register.dto';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entities/user.entity';
import { Role } from '@prisma/client';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { BasicResponse } from '../common/dto/basic-response.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) { }

  @Post('login')
  @ApiOkResponse({ type: AuthEntity })
  async login(@Body() { email, password }: LoginDto): Promise<AuthEntity> {
    return this.authService.login(email, password);
  }

  @Post('register')
  @ApiOkResponse({ type: BasicResponse<UserEntity> })
  async register(@Body() registerDto: RegisterDto): Promise<BasicResponse<UserEntity>> {
    const createUserDto: CreateUserDto = { ...registerDto, role: Role.STAFF };
    const data = await this.userService.create(createUserDto);
    return {
      message: 'User registered, please call api verify/:id to start login...',
      data
    }
  }

  @Post('verify/:id')
  @ApiOkResponse({ type: BasicResponse })
  async verify(@Param('id', ParseIntPipe) id: number): Promise<BasicResponse> {
    return this.authService.verify(id);
  }
}