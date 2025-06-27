import { Test, TestingModule } from '@nestjs/testing';
import { StyleSettingsController } from './style-settings.controller';
import { StyleSettingsService } from './style-settings.service';

describe('StyleSettingsController', () => {
  let controller: StyleSettingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StyleSettingsController],
      providers: [StyleSettingsService],
    }).compile();

    controller = module.get<StyleSettingsController>(StyleSettingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
