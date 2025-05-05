import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class LinkTypeService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async findAll() {
    const { data, error } = await this.supabaseService.getClient()
      .from('link_types')
      .select('*');

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

}
