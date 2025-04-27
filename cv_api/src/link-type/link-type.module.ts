import { Module } from '@nestjs/common';
import { LinkTypeController } from './link-type.controller';
import { LinkTypeService } from './link-type.service';
import { SupabaseModule } from 'src/supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  controllers: [LinkTypeController ],
  providers: [ LinkTypeService ],
})
export class LinkTypeModule {}
