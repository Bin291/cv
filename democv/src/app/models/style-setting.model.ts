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

  headerStyle?: string;
  headerDetails?: 'icon' | 'bullet' | 'bar';
  headerShape?: 'none' | 'rounded' | 'square' | 'circle';

  headingStyle?: string;
  headingCapitalization?: 'capitalize' | 'uppercase';
  headingSize?: 'S' | 'M' | 'L' | 'XL';
  headingIconStyle?: 'none' | 'outline' | 'filled';

  nameSize?: 'XS' | 'S' | 'M' | 'L' | 'XL';
  nameBold?: boolean;
  nameFont?: 'Body' | 'Creative';
  creativeFont?: string;

  jobTitleSize?: 'S' | 'M' | 'L';
  jobTitlePosition?: 'inline' | 'below';
  jobTitleStyle?: 'normal' | 'italic';

  colorScheme?: string;
  templateVariant?: string;
}
