import { IsOptional, IsString, IsNumber, Min, Max, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

enum SortOrder {
    asc = 'asc',
    desc = 'desc',
}

enum SortBy {
    name = 'id',
}

export class GetContactListDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    page?: number = 1;

    @ApiProperty({ required: false })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    @Max(500)
    limit?: number = 10;

    @ApiProperty({ required: false, enum: SortBy, default: SortBy.name })
    @IsOptional()
    @IsString()
    sortBy?: SortBy = SortBy.name;

    @ApiProperty({ required: false, enum: SortOrder, default: SortOrder.asc })
    @IsOptional()
    @IsEnum(SortOrder)
    sortOrder?: SortOrder = SortOrder.asc;

    @ApiProperty({ required: false })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    contactGroupId?: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    contactId?: number;
}
