import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class ResumeService {
  constructor(private readonly supabase: SupabaseService) {}

  async create(data: CreateResumeDto = {}, uid?: string) {
    const client = this.supabase.getClient();
    const insertData = { ...data };
    if (uid) {
      insertData['uid'] = uid;
    }
    const { data: created, error } = await client
      .from('resume')
      .insert([insertData])
      .select()
      .maybeSingle();
    if (error) throw error;
    return created;
  }

  async findOne(id: string) {
    const client = this.supabase.getClient();
    const { data, error } = await client.from('resume').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  }

  async update(id: string, data: UpdateResumeDto, uid?: string) {
    const client = this.supabase.getClient();
    const updateData = { ...data };
    if (uid) {
      updateData['uid'] = uid;
    }
    const { data: updated, error } = await client
      .from('resume')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return updated;
  }
  async findAll(uid?: string) {
    const client = this.supabase.getClient();
    let query = client.from('resume').select('*');
    if (uid) {
      query = query.eq('uid', uid);
    }
    const { data, error } = await query;
    if (error) throw error;
    return data;
  }

}

