export interface StyleSettingsModel {
  id?: string;
  resume_id: string;
  style: StyleConfig;
  created_at?: string;
  updated_at?: string;
}
export interface StyleConfig {
  fontFamily?: string;
  fontSize?: string;
  lineHeight?: number;
  marginLeftRight?: string;
  marginTopBottom?: string;
  entrySpacing?: string;
  jobTitleSize?: 'S' | 'M' | 'L';
  jobTitlePosition?: 'inline' | 'below';
  jobTitleStyle?: 'normal' | 'italic';
  colorScheme?: string;
  templateVariant?: string;
}
