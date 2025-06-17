export class CreateLinkDto {
  id?:        number;
  resume_id: string;
  label:      string;
  name?:      string;
  value?:     string;
  type?:      'link' | 'info';
}
