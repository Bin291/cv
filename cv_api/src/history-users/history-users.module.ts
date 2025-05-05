import { Module } from '@nestjs/common';
import { HistoryUsersController } from './history-users.controller';
import { HistoryUsersService } from './history-users.service';
import { SupabaseModule } from '../supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  controllers: [HistoryUsersController],
  providers: [HistoryUsersService]
})
export class HistoryUsersModule {}
