// src/link/link.controller.ts
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseUUIDPipe,
  ParseIntPipe, HttpCode,
} from '@nestjs/common';
import { LinkService } from './link.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';

@Controller('links')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  // GET /links/resume/:resumeId
  @Get('resume/:resumeId')
  findAllByResume(
    @Param('resumeId', new ParseUUIDPipe()) resumeId: string
  ) {
    return this.linkService.findAllByResume(resumeId);
  }

  // POST /links
  @Post()
  create(@Body() createDto: CreateLinkDto) {
    return this.linkService.create(createDto);
  }

  // PATCH /links/:id
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateLinkDto
  ) {
    return this.linkService.update(id, updateDto);
  }

  // DELETE /links/:id
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.linkService.remove(id);
  }

  // DELETE /links/resume/:resumeId
  @Delete('resume/:resumeId')
  async removeAllByResume(@Param('resumeId') resumeId: string) {
    await this.linkService.removeAllByResume(resumeId);
    return { success: true };
  }

  @Post('resume/:resumeId')
  async upsertByResume(
    @Param('resumeId') resumeId: string,
    @Body() payload: Array<{ id: number; url: string; name?: string; label?: string }>
  ) {
    await this.linkService.upsertLinks(resumeId, payload);
    return { success: true };
  }
}
