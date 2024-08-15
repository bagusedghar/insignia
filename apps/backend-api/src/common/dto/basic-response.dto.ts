import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BasicResponse<T = null> {
    @ApiProperty()
    message: string;

    @ApiPropertyOptional()
    data?: T[] | T | null;
}
