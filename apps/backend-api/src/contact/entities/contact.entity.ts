import { Contact } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ContactEntity implements Contact {
    constructor(partial: Partial<ContactEntity>) {
        Object.assign(this, partial);
    }

    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    address: string;

    @ApiProperty()
    phoneNumber: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}