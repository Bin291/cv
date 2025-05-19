import { Test, TestingModule } from '@nestjs/testing';
import { AddContentService } from './add-content.service';

describe('AddContentService', () => {
  let service: AddContentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddContentService],
    }).compile();

    service = module.get<AddContentService>(AddContentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
