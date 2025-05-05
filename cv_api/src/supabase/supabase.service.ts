import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SupabaseService {
  private supabaseClient: SupabaseClient;

  constructor(private readonly configService: ConfigService) {
    const url = process.env.SUPABASE_URL!;
    const key = process.env.SUPABASE_KEY!;
    this.supabaseClient = createClient(url, key);
    console.log('[Supabase] URL:', url);
    console.log('[Supabase] KEY:', key.slice(0, 8) + '...'); // không in toàn bộ key để bảo mật


  }

  getClient() {
    return this.supabaseClient;
  }
}