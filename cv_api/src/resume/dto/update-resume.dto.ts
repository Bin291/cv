import { PartialType } from '@nestjs/mapped-types';
import { CreateResumeDto } from './create-resume.dto';

export class UpdateResumeDto extends PartialType(CreateResumeDto) {

  style_settings?: any;
}
