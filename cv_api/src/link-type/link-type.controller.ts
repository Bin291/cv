import { Controller, Get,
  Param, Post, Body, Patch,
  Delete, HttpException, HttpStatus,
  Request, Query, Headers, UseGuards,
  UseInterceptors, UploadedFile,
  BadRequestException, ParseFilePipe,
  FileTypeValidator, MaxFileSizeValidator
} from '@nestjs/common';
import { LinkTypeService } from './link-type.service';

@Controller('link-types')
export class LinkTypeController {
  constructor(private readonly linkTypeService: LinkTypeService) {}

  @Get( )
  async getAll() {
    return this.linkTypeService.findAll();
  }
}
