import { Test, TestingModule } from '@nestjs/testing';
import { StyleSettingsService } from './style-settings.service';

describe('StyleSettingsService', () => {
  let service: StyleSettingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StyleSettingsService],
    }).compile();

    service = module.get<StyleSettingsService>(StyleSettingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
