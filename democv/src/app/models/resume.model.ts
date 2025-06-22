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
  contents: ResumeContent[];
}

export interface ResumeContent {
  content: string;           // Tên loại nội dung, ví dụ: 'Education', 'Skills'
  data: ContentItem[];       // Danh sách item của mỗi loại
}

export interface ContentItem {
  id: number;

  // Các field chung hoặc động (từ selectedConfig.fields)
  title?: string;
  subtitle?: string;
  level?: string;
  [key: string]: any; // Cho phép lưu các field động theo từng content type

  // Vị trí địa lý
  city?: string;
  country?: string;

  // Thời gian bắt đầu
  startMonth?: string;
  startYear?: number;
  startOnlyYear?: boolean;
  startDontShow?: boolean;

  // Thời gian kết thúc
  endMonth?: string;
  endYear?: number;
  endOnlyYear?: boolean;
  endDontShow?: boolean;
  present?: boolean;

  // Mô tả dạng HTML
  description?: string;
}
