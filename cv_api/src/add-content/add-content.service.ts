import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class AddContentService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async getAll() {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('add_content')
      .select('*');

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  async getById(id: number) {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('add_content')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
}
