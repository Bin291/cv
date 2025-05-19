import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor(private readonly configService: ConfigService) {
    const url = this.configService.get('SUPABASE_URL');
    const key = this.configService.get('SUPABASE_KEY');
    this.supabase = createClient(url, key);
  }
  getClient() {
    return this.supabase;
  }
}