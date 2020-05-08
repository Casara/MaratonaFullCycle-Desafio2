import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { Maratona } from './maratona.entity';
import { MaratonaDto } from './dto/maratona.dto';

@Injectable()
export default class MaratonaConverter {

  public async convert(marathon: Maratona): Promise<MaratonaDto> {
    return plainToClass(MaratonaDto, marathon);
  }

  public async convertAll(marathons: Maratona[]): Promise<MaratonaDto[]> {
    return Promise.all(marathons.map(this.convert));
  }
}
