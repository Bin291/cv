import { Module } from '@nestjs/common';
import { StyleSettingsService } from './style-settings.service';
import { StyleSettingsController } from './style-settings.controller';
import { SupabaseModule } from '../supabase/supabase.module';
import { ResumeModule } from '../resume/resume.module';

@Module({
  imports: [SupabaseModule,ResumeModule],
  controllers: [StyleSettingsController],
  providers: [StyleSettingsService],
})
export class StyleSettingsModule {}
