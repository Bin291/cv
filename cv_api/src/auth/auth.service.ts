import {
        Injectable,
        UnauthorizedException,
        HttpException,
      } from '@nestjs/common';
      import * as admin from 'firebase-admin';
      import { SupabaseService } from 'src/supabase/supabase.service';

      @Injectable()
      export class AuthService {
        constructor(private readonly supabaseProvider: SupabaseService) {}

        async verifyToken(idToken: string): Promise<any> {
          try {
            const decodedToken = await admin.auth().verifyIdToken(idToken);
            const { uid, email, name, picture } = decodedToken;
        
            const { data, error, count } = await this.supabaseProvider
              .getClient()
              .from('auth')
              .select('*', { count: 'exact' })
              .eq('uid', uid);
        
            if (error) throw new Error(error.message);
        
            if (!count) {
              const insertRes = await this.supabaseProvider.getClient().from('auth').insert([
                {
                  uid,
                  email,
                  name,
                  picture,
                  created_at: new Date().toISOString(), // 👈 thêm created_at nếu chưa có mặc định
                },
              ]);
        
              if (insertRes.error) {
                console.error('[Service] Supabase insert error:', insertRes.error);
                throw new HttpException(insertRes.error.message, 500);
              }
        
              console.log('[Service] User inserted:', insertRes.data);
              return insertRes.data?.[0];
            }
        
            return data?.[0];
          } catch (error) {
            console.error('[Service] verifyToken error:', error);
            throw new UnauthorizedException(error.message);
          }
        }
        
      }