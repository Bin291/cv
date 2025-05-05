import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class HistoryUsersService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async getUserLoginHistory(uid: string): Promise<any[]> {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('history_users')
      .select('*')
      .eq('uid', uid)
      .order('login_time', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
  async getAllLoginHistory(): Promise<any[]> {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('history_users')
      .select('*')
      .order('login_time', { ascending: false });

    if (error) throw new Error(error.message);
    return data;
  }

}
