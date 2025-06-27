import { IsObject, IsOptional } from 'class-validator';

export class UpdateStyleSettingsDto {
  @IsOptional()
  @IsObject()
  style: Partial<any>;}
