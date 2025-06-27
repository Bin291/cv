import {
  Controller,
  Get,
  Patch,
  Param,
  Body,
  NotFoundException
} from '@nestjs/common';
import { StyleSettingsService } from './style-settings.service';
import { UpdateStyleSettingsDto } from './dto/update-style-setting.dto';

@Controller('style-settings')
export class StyleSettingsController {
  constructor(private readonly styleService: StyleSettingsService) {}

  @Get('resume/:resumeId')
  async getByResumeId(@Param('resumeId') resumeId: string) {
    const style = await this.styleService.loadStyle(resumeId);
    if (!style) throw new NotFoundException('Style not found');
    return style; // hoặc style.style nếu chỉ muốn phần json
  }

  @Patch('resume/:resumeId')
  async patchByResumeId(
    @Param('resumeId') resumeId: string,
    @Body() dto: UpdateStyleSettingsDto
  ) {
    return this.styleService.saveStyle(resumeId, dto.style);
  }
}
