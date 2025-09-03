import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class SetVisibilityDto {
  @ApiProperty({ example: true })
  @IsBoolean()
  isPublic: boolean;
}
