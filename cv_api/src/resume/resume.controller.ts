// src/resume/resume.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  Patch,
  BadRequestException,
  Delete,
} from '@nestjs/common';
import { ResumeService } from './resume.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';

@Controller('resume')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  // @Post()
  // async create(@Req() req: any, @Body() dto: CreateResumeDto) {
  //     const uid = req.user?.uid;
  //     if (uid) {
  //       return this.resumeService.create({ ...dto, uid });
  //     } else {
  //       // guest: chỉ cho tạo 1 lần
  //       const existing = await this.resumeService.findAllByUser('guest');
  //       if (existing.length > 0) {
  //         throw new BadRequestException(
  //           'Bạn đã tạo resume mẫu rồi, vui lòng đăng nhập để tạo mới.'
  //         );
  //       }
  //       return this.resumeService.create({ ...dto, uid: 'guest' });
  //     }
  //   }


  @Post()
  async create(
    @Body() createDto: CreateResumeDto,
    @Req() req: any,            // req.user có thể undefined
  ) {
    const uid = req.user?.uid ?? null;
    return this.resumeService.create(createDto, uid);
  }


  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.resumeService.findOne(id);
  }

  // route sửa lại thành /resume/user/:uid cho rõ ràng
  @Get('user/:uid')
  async findAllByUser(@Param('uid') uid: string) {
    return this.resumeService.findAllByUser(uid);
  }


  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateResumeDto,
  ) {
    return this.resumeService.update(id, dto);
  }

  @Get('user/:uid')
  findByUser(@Param('uid') uid: string) {
    return this.resumeService.findAllByUser(uid);
  }


  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.resumeService.delete(id);
  }

}
