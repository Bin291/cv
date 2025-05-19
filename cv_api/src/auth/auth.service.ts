import {
  Injectable,
  UnauthorizedException,
  HttpException,
} from '@nestjs/common';
import * as admin from 'firebase-admin';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class AuthService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async verifyToken(idToken: string): Promise<any> {
    try {
      const decoded = await admin.auth().verifyIdToken(idToken);
      const { uid, email, name, picture } = decoded;
      console.log('[Backend] Đã decode token:', decoded);
      console.log('[Backend] UID:', uid);

      // Upsert user vào bảng auth
      const { error: upsertError, data: upsertData } = await this.supabaseService
        .getClient()
        .from('auth')
        .upsert([{ uid, email, name, picture }]);
      if (upsertError) {
        console.error('[Supabase Error]', upsertError.message);
        throw new HttpException(upsertError.message, 500);
      } else {
        console.log('[Supabase] Upsert thành công:', upsertData);
      }

      // Ghi log vào bảng history_users
      const { error: logError } = await this.supabaseService
        .getClient()
        .from('history_users')
        .insert([{ uid, email, name, picture }]);

      if (logError) {
        console.warn('[Supabase] Không thể ghi lịch sử đăng nhập:', logError.message);
      } else {
        console.log('[Supabase] Đã ghi lịch sử đăng nhập của user:', uid);
      }

      // Trả lại user từ bảng auth
      const { data: user, error } = await this.supabaseService
        .getClient()
        .from('auth')
        .select('*')
        .eq('uid', uid)
        .maybeSingle();

      if (error || !user) {
        throw new HttpException(error?.message || 'User not found', 400);
      }

      return user;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
