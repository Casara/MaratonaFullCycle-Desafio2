import { Test, TestingModule } from '@nestjs/testing';

import { MaratonaController } from './maratona.controller';

describe('Maratona Controller', () => {
  let controller: MaratonaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaratonaController],
    }).compile();

    controller = module.get<MaratonaController>(MaratonaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
