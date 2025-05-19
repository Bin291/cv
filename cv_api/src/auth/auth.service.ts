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
              .eq('uid', decodedToken.uid);

            if (error) {
              throw new Error(error.message);
            }

            if (count === null || count === 0) {
              const { data, error } = await this.supabaseProvider
                .getClient()
                .from('auth')
                .insert([{ uid, email, name, picture }]);

              if (error) {
                throw new HttpException(error.message, 500);
              }

              const { data: user, error: userError } = await this.supabaseProvider
                .getClient()
                .from('auth')
                .select('*')
                .eq('uid', decodedToken.uid);

              if (userError) {
                throw new HttpException(userError.message, 400);
              }

              return user[0];
            } else if (count > 1) {
              throw new Error('Multiple rows returned for a single user');
            }

            return data[0];
          } catch (error) {
            throw new Error(error.message);
          }
        }
      }