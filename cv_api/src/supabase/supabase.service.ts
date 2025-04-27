import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private supabaseClient: SupabaseClient;

  constructor() {
    const url = process.env.SUPABASE_URL!;
    const key = process.env.SUPABASE_KEY!;
    this.supabaseClient = createClient(url, key);
  }

  get client() {
    return this.supabaseClient;
  }
}
