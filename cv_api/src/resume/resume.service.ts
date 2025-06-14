import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { SupabaseService } from '../supabase/supabase.service';
import { Resume } from './entities/resume.entity';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class ResumeService {
  constructor(private readonly supabase: SupabaseService) {

  }
  // async create(data: CreateResumeDto & { uid?: string }) {
  //   // Nếu uid không có thì gán 'guest'
  //   const owner = data.uid ?? 'guest';
  //
  //   // Chuẩn bị payload để insert
  //   const payload = {
  //     ...data,
  //     uid: owner,
  //   };
  //
  //   const { error, data: inserted } = await this.supabase
  //     .getClient()
  //     .from('resume')
  //     .insert(payload)
  //     .single();
  //
  //   if (error) {
  //     console.error('Supabase insert error:', error);
  //     throw new InternalServerErrorException(error.message);
  //   }
  //   return inserted;
  // }


  async create(createDto: CreateResumeDto, uid: string | null) {
    // Build payload
    const payload: any = { ...createDto };
    if (uid) {
      payload.uid = uid;
    }
    // Nếu uid === null thì không set uid, Supabase sẽ để NULL

    const { data, error } = await this.supabase.getClient()
      .from('resume')
      .insert([payload])
      .select();

    if (error) {
      console.error('Supabase insert error:', error);
      throw new InternalServerErrorException(error.message);
    }
    return data![0];
  }


  async findOne(id: string) {
    const client = this.supabase.getClient();
    const { data, error } = await client.from('resume').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  }

  async update(id: string, data: UpdateResumeDto, uid?: string) {
    const client = this.supabase.getClient();
    const updateData = { ...data };
    if (uid) {
      updateData['uid'] = uid;
    }
    const { data: updated, error } = await client
      .from('resume')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return updated;
  }



  async findAllByUser(uid: string) {
    const { data, error } = await this.supabase.getClient()
      .from('resume')
      .select('*')
      .eq('uid', uid)         // <-- dùng đúng tên cột
      .order('updated_at', { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  }

  async delete(id: string) {
    const client = this.supabase.getClient();
    const { error } = await client.from('resume').delete().eq('id', id);
    if (error) {
      console.error('Supabase delete error:', error);
      throw new InternalServerErrorException(error.message);
    }
    return { message: 'Resume deleted successfully' };
  }

  async findAll(): Promise<Resume[]> {
    const client = this.supabase.getClient();
    const { data, error } = await client.from('resume').select('*');
    if (error) {
      console.error('Supabase fetch all resumes error:', error);
      throw new InternalServerErrorException(error.message);
    }
    return data as Resume[];
  }



}