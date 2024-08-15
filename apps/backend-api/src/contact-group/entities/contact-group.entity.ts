import { ContactGroup } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ContactGroupEntity implements ContactGroup {
    constructor(partial: Partial<ContactGroupEntity>) {
        Object.assign(this, partial);
    }

    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}