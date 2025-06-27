import {
  Component,
  Inject, Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID
} from '@angular/core';
import {
  map,
  Observable
} from 'rxjs';
import {
  AsyncPipe,
  isPlatformBrowser,
  NgClass,
  NgForOf,
  NgIf,
  NgStyle
} from '@angular/common';
import { ResumeModel } from '../../models/resume.model';
import { Store } from '@ngrx/store';
import { ResumeState } from '../../ngrx/resume/resume.state';
import {
  MatCardModule
} from '@angular/material/card';
import {
  MatIconModule
} from '@angular/material/icon';
import { LetDirective } from '@ngrx/component';
import { loadResume } from '../../ngrx/resume/resume.action';
import { LinkState } from '../../ngrx/link/link.state';
import { LinkModel } from '../../models/link.model';
import * as LinkActions from '../../ngrx/link/link.actions';
import { ResumeService } from '../../services/resume/resume.service';
import {FontService} from '../../services/font/font.service';
import {StyleService} from '../../services/style/style.service';
import {StyleConfig} from '../../models/style-setting.model';

@Component({
  selector: 'app-cv',
  standalone: true,
  imports: [
    NgIf,
    MatIconModule,
    MatCardModule,
    LetDirective,
    NgForOf,
    AsyncPipe,
    NgClass,
    NgStyle,

  ],
  templateUrl: './cv.component.html',
  styleUrl: './cv.component.scss'
})
export class CVComponent implements OnInit, OnDestroy {
  resume$!: Observable<ResumeModel | null>;
  links$!: Observable<LinkModel[]>;
  isBrowser: boolean;
  selectedFontClass = '';
  templateClass: string = 'template-brian';
  fontFamily: string = 'Lexend';
  selectedSize = 'S';
  selectedPosition = 'Try Same Line';
  selectedStyle = 'Normal';
  resumeId!: string;

  size: string = 'M';
  position: string = 'Below';
  fontStyle: string = 'Normal';
  fontSize: number = 30;
  lineHeight: number = 1.5;
  marginX: number = 12;
  marginY: number = 20;
  spacingBetween: number = 16;

  constructor(
    private store: Store<{ resume: ResumeState; link: LinkState }>,
    @Inject(PLATFORM_ID) private platformId: Object,
    private resumeService: ResumeService,
    private fontService: FontService,
    private styleService: StyleService
  ) {
    this.resume$ = this.store.select(state => state.resume.resume);
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.links$ = this.resume$.pipe(
      map(resume => {
        try {
          const rawLinks = typeof resume?.links === 'string'
            ? JSON.parse(resume.links)
            : resume?.links || [];
          return rawLinks.filter((link: LinkModel) => !!link.name?.trim());
        } catch (e) {
          console.error('Parse error links:', e);
          return [];
        }
      })
    );
  }
  setFontClass(font: string) {
    this.selectedFontClass = `font-${font.replace(/\s+/g, '')}`;
    console.log('[FONT] Class font đang áp dụng:', this.selectedFontClass);
  }
  ngOnInit(): void {
    let resumeId: string | null = null;

    if (this.isBrowser) {
      resumeId = localStorage.getItem('resume_id');
      if (resumeId) {
        this.store.dispatch(loadResume({ id: resumeId }));
        this.store.dispatch(LinkActions.loadLinks({ resumeId }));
      }

      const savedTemplate = localStorage.getItem('cv_template');
      if (savedTemplate) {
        this.templateClass = `template-${savedTemplate}`;
      }

      window.addEventListener('cv-template-change', this.handleTemplateChange);
    }

    if (resumeId) {
      this.resumeId = resumeId;

      // Lắng nghe cập nhật style realtime
      this.styleService.style$.subscribe(style => {
        this.applyStyle(style);
      });

      // Load style từ Supabase một lần và phát vào stream
      this.styleService.loadStyle(resumeId).subscribe({
        next: ({ style }) => this.styleService.emitLocalStyle(style), // ✅ thay vì gọi applyStyle trực tiếp
        error: (err) => {
          console.warn('[CV] Không tìm thấy style, dùng mặc định.', err.message);
        }
      });
    }

  }

  applyStyle(style: StyleConfig) {
    this.selectedFontClass = style.fontFamily ? `font-${style.fontFamily}` : 'font-Lexend';
    if (style.templateVariant) {
      this.templateClass = `template-${style.templateVariant}`;
    }


    this.size = style.jobTitleSize || 'M';
    this.position = style.jobTitlePosition === 'inline' ? 'Try Same Line' : 'Below';
    this.fontStyle = style.jobTitleStyle === 'italic' ? 'Italic' : 'Normal';

    this.fontSize = style.fontSize ? parseInt(style.fontSize) : 12;
    this.lineHeight = style.lineHeight || 1.5;
    this.marginX = style.marginLeftRight ? parseInt(style.marginLeftRight) : 12;
    this.marginY = style.marginTopBottom ? parseInt(style.marginTopBottom) : 20;
    this.spacingBetween = style.entrySpacing ? parseInt(style.entrySpacing) : 16;

    console.log('[CV] ✅ Style loaded & applied:', style);
  }


  applyFontClass(font: string) {
    this.fontFamily = font;
    this.selectedFontClass = `font-${font.replace(/\s+/g, '')}`;
  }

  handleTemplateChange = (e: any) => {
    if (this.isBrowser) {
      this.templateClass = `template-${e.detail}`;
      localStorage.setItem('cv_template', e.detail);
    }
  };

  ngOnDestroy(): void {
    if (this.isBrowser) {
      window.removeEventListener('cv-template-change', this.handleTemplateChange);
    }
  }
  get jobTitleClass(): string[] {
    return [
      `job-size-${this.size}`,
      `job-position-${this.position.replace(/ /g, '-')}`,
      this.fontStyle === 'Italic' ? 'italic' : 'normal'
    ];
  }



}
