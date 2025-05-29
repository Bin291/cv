import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';

@Controller('resume')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @Post()
  async create(@Body() createResumeDto: CreateResumeDto) {
    return this.resumeService.create(createResumeDto);
  }

  @Get()
  async findAll() {
    return this.resumeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.resumeService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateResumeDto: UpdateResumeDto) {
    return this.resumeService.update(id, updateResumeDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.resumeService.remove(id);
  }
}
