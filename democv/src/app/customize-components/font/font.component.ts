import {
  Component,
  EventEmitter,
  Inject,
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

@Component({
  selector: 'app-font',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './font.component.html',
  styleUrl: './font.component.scss'
})
export class FontComponent implements OnInit {
  @Output() fontChanged = new EventEmitter<string>();
  fontTypes = ['Serif', 'Sans', 'Mono'];
  fontFamilies = [
    'Source Sans Pro', 'Karla', 'Mulish',
    'Lato', 'Titillium Web', 'Work Sans',
    'Barlow', 'Jost', 'Fira Sans',
    'Roboto', 'Rubik', 'Asap',
    'Nunito', 'Open Sans', 'Lexend',
  ];
  user$!: Observable<User | null>;
  selectedFontType = 'Sans';
  selectedFontFamily = 'Lexend';
  auth$!: Observable<AuthModel | null>;

  constructor(
    private styleService: StyleService,
    private store: Store<{ auth: AuthState }>,
    private auth: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.auth$ = this.store.select(s => s.auth.authData);
  }

  selectFontType(type: string) {
    this.selectedFontType = type;
  }

  async selectFontFamily(font: string) {
    this.selectedFontFamily = font;
    this.fontChanged.emit(font);

    if (isPlatformBrowser(this.platformId)) {
      const resumeId = localStorage.getItem('resume_id');
      if (resumeId) {
        try {
          const req$ = await this.styleService.update(resumeId, { fontFamily: font });
          req$.subscribe();
        } catch (err) {
          console.error('❌ Error updating font style:', err);
        }
      }
    }

    this.store.dispatch(updateSelectedFont({ font }));
  }

  async ngOnInit() {
    this.user$ = this.auth.getCurrentUser();

    if (isPlatformBrowser(this.platformId)) {
      const resumeId = localStorage.getItem('resume_id');
      if (resumeId) {
        try {
          const req$ = await this.styleService.getByResumeId(resumeId);
          req$.subscribe({
            next: (styleSettings) => {
              this.selectedFontFamily = styleSettings.style?.fontFamily || 'Lexend';
            },
            error: async (err) => {
              if (err.status === 404) {
                const create$ = await this.styleService.create(resumeId, { fontFamily: 'Lexend' });
                create$.subscribe();
              } else {
                console.error('❌ Failed to load style settings:', err);
              }
            }
          });
        } catch (e) {
          console.error('❌ Error calling styleService:', e);
        }
      }
    }
  }
}
