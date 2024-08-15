import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateContactListDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    contactGroupId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    contactId: number;

}