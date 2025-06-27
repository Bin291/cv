import { IsUUID, IsObject } from 'class-validator';

export class CreateStyleSettingsDto {
  @IsUUID()
  resume_id: string;

  @IsObject()
  style: Record<string, any>;
}
