import {LinkModel} from './link.model';

export interface ResumeModel {
  id?: string;
  uid?: string;
  full_name?: string;
  job_title?: string;
  email?: string;
  phone?: string;
  location?: string;
  avatar_url?: string;
  created_at?: string;      // ISO string từ Supabase
  updated_at?: string;
  resume_name?: string; // Tên của resume, có thể dùng để phân biệt các bản lưu
  nationality?: string;       // Quốc tịch
  date_of_birth?: string; // Ngày sinh, có thể là ISO string hoặc định dạng khác
  visa_status?: string; // Trạng thái visa, nếu có
  passport_or_id?: string; // Số hộ chiếu hoặc ID, nếu có
  gender_or_pronoun?: string; // Giới tính hoặc đại từ, nếu có
  driving_license?: string; // Giấy phép lái xe, nếu có
  minitary_service?: string; // Trạng thái nghĩa vụ quân sự, nếu có
  avatar_origin?: string; // Đường dẫn gốc của ảnh đại diện, nếu có
  template_id?: string; // ID của template resume, nếu có
  material_status?: string; // Tình trạng hôn nhân, nếu có
links?: LinkModel[];

}

