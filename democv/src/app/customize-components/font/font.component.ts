import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser, NgForOf } from '@angular/common';
import { updateSelectedFont } from '../../ngrx/resume/resume.action';
import { StyleService } from '../../services/style/style.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '@angular/fire/auth';
import { AuthModel } from '../../models/auth.model';
import { AuthService } from '../../services/auth/auth.service';
import { AuthState } from '../../ngrx/auth/auth.state';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-font',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './font.component.html',
  styleUrl: './font.component.scss'
})
export class FontComponent implements OnInit {
  @Output() fontChanged = new EventEmitter<string>();
  @Input() resumeId!: string;

  fontTypes = ['Serif', 'Sans', 'Mono'];
  fontFamilies = [
    'Source Sans Pro', 'Karla', 'Fira Sans',
    'Roboto', 'Open Sans', 'Lato',
    'Work Sans', 'Jost', 'Mulish',
    'Lexend', 'Nunito', 'Rubik',
    'Titillium Web', 'Asap', 'Barlow'
  ];

  user$!: Observable<User | null>;
  auth$!: Observable<AuthModel | null>;
  selectedFontType = 'Sans';
  selectedFontFamily = '';

  constructor(
    private styleService: StyleService,
    private store: Store<{ auth: AuthState }>,
    private auth: AuthService,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.auth$ = this.store.select(s => s.auth.authData);
  }

  ngOnInit() {
    if (this.resumeId) {
      this.styleService.loadStyle(this.resumeId).subscribe({
        next: ({ style }) => {
          this.selectedFontFamily = style.fontFamily || 'Lexend';
          console.log('[FONT] Font từ Supabase:', this.selectedFontFamily);
          this.cdr.detectChanges(); // 👈 ép Angular cập nhật
        },
        error: (err) => {
          console.warn('[FONT] ❌ Không load được style. Dùng mặc định.', err.message);
          this.selectedFontFamily = 'Lexend';
          this.cdr.detectChanges(); // 👈 luôn detect
        }
      });
    }
  }

  selectFontType(type: string) {
    this.selectedFontType = type;
  }

  selectFontFamily(font: string) {
    this.selectedFontFamily = font;
    console.log('[FONT] Font được chọn:', font);

    const patch = { fontFamily: font };

    if (this.resumeId) {
      // 🔄 Lấy style hiện tại từ local cache
      const currentStyle = this.styleService.getCurrentStyle();
      const mergedStyle = { ...currentStyle, ...patch };

      this.styleService.saveStyle(this.resumeId, mergedStyle).subscribe({
        next: () => {
          this.styleService.emitLocalStyle(mergedStyle); // cập nhật toàn bộ
          this.store.dispatch(updateSelectedFont({ font }));
        },
        error: err => console.error('[FONT] ❌ Lỗi khi lưu font', err)
      });
    }
  }

}
