import { Controller, Get, Post, Body, Patch, Param, Req, HttpException, HttpStatus } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';

@Controller('resume')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @Post()
  async create(@Body() createResumeDto: CreateResumeDto, @Req() req) {
    // Giả sử bạn lấy uid từ req.user (đã qua auth middleware)
    const uid = req.user?.uid;
    return this.resumeService.create(createResumeDto, uid);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.resumeService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateResumeDto
  ) {
    return this.resumeService.update(id, dto);
  }



}
