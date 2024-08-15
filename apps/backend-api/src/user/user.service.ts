import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './entities/user.entity';
import { Prisma } from '@prisma/client';
import { GetUserDto } from './dto/get-user.dto';
import { plainToClass } from 'class-transformer';
import { PrismaService } from '../prisma/prisma.service';
import { PaginatedResponseDto } from '../common/dto/paginated-response.dto';

export const roundsOfHashing = 10;

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      roundsOfHashing,
    );
    createUserDto.password = hashedPassword;

    return plainToClass(UserEntity, this.prisma.user.create({ data: createUserDto }));
  }

  async findAll(query: GetUserDto): Promise<PaginatedResponseDto<UserEntity>> {
    const { page, limit, sortBy, sortOrder, name, role } = query;
    const skip = (page - 1) * limit;
    const where: Prisma.UserWhereInput = {
      ...(role && { role }),
      ...(name && {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      }),
    };

    const orderBy = { [sortBy]: sortOrder }

    const data = await this.prisma.user.findMany({
      skip,
      take: limit,
      where,
      orderBy
    });

    const total = await this.prisma.user.count({
      where
    });

    return {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data: data.map(user => plainToClass(UserEntity, user)),
    };
  }

  async findOne(id: number): Promise<UserEntity> {
    return plainToClass(UserEntity, this.prisma.user.findUniqueOrThrow({ where: { id } }));
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        roundsOfHashing,
      );
    }

    return plainToClass(UserEntity, this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    }));
  }

  async remove(id: number): Promise<UserEntity> {
    return plainToClass(UserEntity, this.prisma.user.delete({
      where: { id }    
    }));
  }
}
