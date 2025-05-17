import { Module } from '@nestjs/common';
import {AddContentService} from './add-content.service';
import { AddContentController } from './add-content.controller';
import { SupabaseService } from 'src/supabase/supabase.service';

@Module({
  controllers: [AddContentController],
  providers: [AddContentService, SupabaseService],
})
export class AddContentModuleModule {}