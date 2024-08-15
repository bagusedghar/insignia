import { Role, User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }

    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @Exclude()
    password: string;

    @ApiProperty()
    role: Role;

    @ApiProperty()
    lastActivityAt: Date;

    @ApiProperty()
    emailVerfiedAt: Date;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}