import { ContactList } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ContactListEntity implements ContactList {
    constructor(partial: Partial<ContactListEntity>) {
        Object.assign(this, partial);
    }

    @ApiProperty()
    id: number;

    @ApiProperty()
    contactGroupId: number;

    @ApiProperty()
    contactId: number;
}