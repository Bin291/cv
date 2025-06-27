import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import {  CreateStyleSettingsDto } from './dto/create-style-setting.dto';
import { UpdateStyleSettingsDto } from './dto/update-style-setting.dto';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class StyleSettingsService {
  constructor(private readonly supabase: SupabaseService) {}


  async findByResumeId(resumeId: string) {
    const { data, error } = await this.supabase.getClient()
      .from('style_settings')
      .select('*')
      .eq('resume_id', resumeId)
      .single();

    if (error || !data) {
      throw new NotFoundException('Style settings not found');
    }
    return data;
  }

  async create(createDto: CreateStyleSettingsDto) {
    const { data, error } = await this.supabase.getClient()
      .from('style_settings')
      .insert([createDto])
      .select()
      .single();

    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    return data;
  }

  async updateByResumeId(resumeId: string, updateDto: UpdateStyleSettingsDto) {
    // merge style JSON
    const current = await this.findByResumeId(resumeId);
    const updatedStyle = { ...current.style, ...updateDto.style };

    const { data, error } = await this.supabase.getClient()
      .from('style_settings')
      .update({ style: updatedStyle })
      .eq('resume_id', resumeId)
      .select()
      .single();

    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    return data;
  }
  async loadStyle(resumeId: string) {
    const { data, error } = await this.supabase.getClient()
      .from('style_settings')
      .select('style')
      .eq('resume_id', resumeId)
      .single();

    if (error || !data) {
      throw new NotFoundException('Style not found');
    }

    return data; // hoặc return data.style nếu chỉ cần object thuần
  }

  async saveStyle(resumeId: string, patch: Partial<any>) {
    const { data: existingData, error: selectError } = await this.supabase.getClient()
      .from('style_settings')
      .select('style')
      .eq('resume_id', resumeId)
      .maybeSingle();

    const existingStyle = existingData?.style ?? {};

    // ✅ Check kiểu dữ liệu rõ ràng
    if (typeof existingStyle !== 'object') {
      console.warn('[saveStyle] existingStyle is invalid, fallback to empty object');
    }

    const mergedStyle = { ...(typeof existingStyle === 'object' ? existingStyle : {}), ...patch };

    const { data, error } = await this.supabase.getClient()
      .from('style_settings')
      .upsert(
        {
          resume_id: resumeId,
          style: mergedStyle,
          updated_at: new Date().toISOString()
        },
        { onConflict: 'resume_id' }
      )
      .select()
      .single();

    if (error) {
      console.error('[Supabase][saveStyle] PATCH failed:', error.message);
      throw new InternalServerErrorException(error.message);
    }

    return data;
  }




}
