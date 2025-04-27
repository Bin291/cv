import { Test, TestingModule } from '@nestjs/testing';
import { LinkTypeController } from './link-type.controller';

describe('LinkTypeController', () => {
  let controller: LinkTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LinkTypeController],
    }).compile();

    controller = module.get<LinkTypeController>(LinkTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
