import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class LinkService {
  constructor(private readonly supabase: SupabaseService) {}

  // Tạo link mới
  async create(createDto: CreateLinkDto) {
    const { data, error } = await this.supabase
      .getClient()
      .from('links')
      .insert(createDto)
      .single();

    if (error) throw new InternalServerErrorException(error.message);
    return data;
  }

  // Lấy tất cả link theo resume_id
  async findAllByResume(resumeId: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('links')
      .select('*')
      .eq('resume_id', resumeId)
      .order('id', { ascending: true });

    if (error) throw new InternalServerErrorException(error.message);
    return data;
  }

  // Cập nhật link theo id
  async update(id: number, updateDto: UpdateLinkDto) {
    const { data, error } = await this.supabase
      .getClient()
      .from('links')
      .update(updateDto)
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') throw new NotFoundException(`Link ${id} not found`);
      throw new InternalServerErrorException(error.message);
    }
    return data;
  }

  // Xóa link theo id
  async remove(id: number) {
    const { count, error } = await this.supabase
      .getClient()
      .from('links')
      .delete()
      .eq('id', id)
      .maybeSingle();

    if (error) throw new InternalServerErrorException(error.message);
    if (count === 0) throw new NotFoundException(`Link ${id} not found`);
    return;
  }

  // Xóa tất cả link của 1 resume
  async removeAllByResume(resumeId: string): Promise<void> {
    const { error } = await this.supabase
      .getClient()
      .from('links')
      .delete()
      .eq('resume_id', resumeId);

    if (error) {
      throw new HttpException(
        `Cannot delete links for resume ${resumeId}: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /** Upsert toàn bộ links: xóa cũ + insert mới */
  async upsertLinks(
    resumeId: string,
    links: Array<{ id?: number; url: string; name?: string, label?: string, icon?: string }>,
  ): Promise<void> {
    // 1) xoá hết trước
    await this.removeAllByResume(resumeId);

    // 2) insert mới
    // build payload cho Supabase
    const toInsert = links.map(l => ({
      resume_id:    resumeId,
      value:        l.url,
      name:         l.name,
      label:        l.label,
      icon:         l.icon,
    }));

    const { error } = await this.supabase
      .getClient()
      .from('links')
      .insert(toInsert);

    if (error) {
      throw new HttpException(
        `Cannot insert links for resume ${resumeId}: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
