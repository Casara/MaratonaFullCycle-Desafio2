import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiProduces, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Maratona } from './maratona.entity';
import { CreateMaratonaDto } from './dto/create-maratona.dto';
import { MaratonaDto } from './dto/maratona.dto';
import MaratonaConverter from './maratona.converter';

@ApiTags('Maratona')
@Controller('maratona')
export class MaratonaController {

  constructor(
    @InjectRepository(Maratona)
    private readonly maratonaRepo: Repository<Maratona>,
    private readonly maratonaConverter: MaratonaConverter
  ) {
  }

  @Get()
  @ApiOperation({
    summary: 'Listar aulas',
    description: 'Retorna uma lista de todas as aulas.',
  })
  @ApiProduces('application/json; charset=utf-8')
  @ApiOkResponse({ type: MaratonaDto, isArray: true })
  async index(): Promise<MaratonaDto[]> {
    const marathons: MaratonaDto[] = await this.maratonaRepo.find();
    return this.maratonaConverter.convertAll(marathons);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Inserir aula',
    description: 'Insere uma nova aula.',
  })
  @ApiBody({ type: CreateMaratonaDto })
  @ApiProduces('application/json; charset=utf-8')
  @ApiCreatedResponse({ type: MaratonaDto })
  async store(@Body() body: CreateMaratonaDto): Promise<MaratonaDto> {
    const marathon = this.maratonaRepo.create(body);
    await this.maratonaRepo.save(marathon);
    return this.maratonaConverter.convert(marathon);
  }
}
