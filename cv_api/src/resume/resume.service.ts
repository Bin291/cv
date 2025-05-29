import { Injectable } from '@nestjs/common';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { SupabaseService } from '../supabase/supabase.service'; // Adjust the import path as necessary

@Injectable()
export class ResumeService {
  constructor(private readonly supabase: SupabaseService) {}

  async create(data: CreateResumeDto = {}) {
    const client = this.supabase.getClient();
    const { data: created, error } = await client
      .from('resume')
      .insert([data])
      .select()
      .maybeSingle();


    if (error) throw error;
    return created;
  }

  async findAll() {
    const client = this.supabase.getClient();
    const { data, error } = await client.from('resume').select('*');
    if (error) throw error;
    return data;
  }

  async findOne(id: string) {
    const client = this.supabase.getClient();
    const { data, error } = await client.from('resume').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  }

  async update(id: string, data: UpdateResumeDto) {
    const client = this.supabase.getClient();
    const { data: updated, error } = await client
      .from('resume')
      .update({ ...data })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return updated;
  }

  async remove(id: string) {
    const client = this.supabase.getClient();
    const { error } = await client.from('resume').delete().eq('id', id);
    if (error) throw error;
    return { message: 'Deleted successfully' };
  }



}
