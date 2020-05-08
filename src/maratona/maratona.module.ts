import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Maratona } from './maratona.entity';
import { MaratonaController } from './maratona.controller';
import MaratonaConverter from './maratona.converter';

@Module({
  imports: [
    TypeOrmModule.forFeature([Maratona]),
  ],
  controllers: [MaratonaController],
  providers: [ConfigService, MaratonaConverter],
})
export class MaratonaModule {}
