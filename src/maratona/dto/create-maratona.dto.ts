import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMaratonaDto {

  @Expose()
  @IsNotEmpty()
  @ApiProperty({ description: 'Título da aula' })
  aula: string;
}
