import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class MaratonaDto {

  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty({ description: 'Título da aula' })
  aula: string;
}
