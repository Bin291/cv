// src/resume/dto/create-resume.dto.ts
import { IsOptional, IsString, IsUUID, IsDateString } from 'class-validator';

export class CreateResumeDto {

  @IsOptional()
  @IsString()
  full_name?: string;

  @IsOptional()
  @IsString()
  job_title?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  avatar_url?: string;

  // Supabase tự set created_at và updated_at, không cần DTO này
  // @IsOptional() @IsDateString() created_at?: string;
  // @IsOptional() @IsDateString() updated_at?: string;

  @IsOptional()
  @IsDateString()
  date_of_birth?: string;

  @IsOptional()
  @IsString()
  passport_or_id?: string;

  @IsOptional()
  @IsString()
  gender_or_pronoun?: string;

  @IsOptional()
  @IsString()
  driving_license?: string;

  @IsOptional()
  @IsString()
  material_status?: string;

  @IsOptional()
  @IsString()
  minitary_service?: string;  // đúng với cột `minitary_service`

  @IsOptional()
  @IsString()
  nationality?: string;       // đúng với cột `nationality`

  @IsOptional()
  @IsString()
  visa_status?: string;

  @IsOptional()
  @IsString()
  avatar_origin?: string;

  @IsOptional()
  @IsString()
  resume_name?: string;

  @IsOptional()
  @IsUUID()
  template_id?: string;

  // Supabase có thêm cột update_at nhưng thường không set qua DTO
  // @IsOptional() @IsDateString() update_at?: string;
}
