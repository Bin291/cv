import { Test, TestingModule } from '@nestjs/testing';
import { LinkTypeService } from './link-type.service';

describe('LinkTypeService', () => {
  let service: LinkTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LinkTypeService],
    }).compile();

    service = module.get<LinkTypeService>(LinkTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
