import { PartialType } from '@nestjs/mapped-types';
import { CreateResumeDto } from './create-resume.dto';
import { IsOptional, IsString } from 'class-validator';
export class UpdateResumeDto extends PartialType(CreateResumeDto) {
  @IsOptional()
  @IsString()
  resume_name?: string;

}
