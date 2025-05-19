import { Controller, Get, Param } from '@nestjs/common';
import { AddContentService } from './add-content.service';

@Controller('add-content')
export class AddContentController {
  constructor(private readonly addContentService: AddContentService) {}

  @Get()
  getAll() {
    console.log('get all');
    return this.addContentService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.addContentService.getById(id);
  }
}
