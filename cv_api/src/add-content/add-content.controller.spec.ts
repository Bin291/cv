import { Test, TestingModule } from '@nestjs/testing';
import { AddContentController } from './add-content.controller';

describe('AddContentController', () => {
  let controller: AddContentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddContentController],
    }).compile();

    controller = module.get<AddContentController>(AddContentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
