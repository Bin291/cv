import { Module } from '@nestjs/common';
import {AddContentService} from './add-content.service';
import { AddContentController } from './add-content.controller';
import { SupabaseModule } from '../supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  controllers: [AddContentController],
  providers: [AddContentService],
})
export class AddContentModuleModule {}