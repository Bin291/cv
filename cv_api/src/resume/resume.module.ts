import { Module } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { ResumeController } from './resume.controller';
import { SupabaseModule } from '../supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  controllers: [ResumeController],
  providers: [ResumeService],
  exports: [ResumeService]
})
export class ResumeModule {}
