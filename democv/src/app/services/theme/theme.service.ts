import {Injectable, Renderer2, RendererFactory2} from '@angular/core';

      @Injectable({
        providedIn: 'root',
      })
      export class ThemeService {
        private renderer: Renderer2;
        private readonly darkClass = 'dark-theme';
        private isBrowser = typeof window !== 'undefined';

        constructor(rendererFactory: RendererFactory2) {
          this.renderer = rendererFactory.createRenderer(null, null);
        }

        enableDarkTheme(): void {
          this.renderer.addClass(document.documentElement, this.darkClass);
          if (this.isBrowser) localStorage.setItem('theme', 'dark');
        }

        enableLightTheme(): void {
          this.renderer.removeClass(document.documentElement, this.darkClass);
          if (this.isBrowser) localStorage.setItem('theme', 'light');
        }

        toggleTheme(): void {
          const isDark = document.documentElement.classList.contains(this.darkClass);
          isDark ? this.enableLightTheme() : this.enableDarkTheme();
        }

        /** ✅ Đây là phần quan trọng */
        loadInitialTheme(): void {
          if (!this.isBrowser) return;

          const saved = localStorage.getItem('theme');
            // Nếu không có theme đã lưu, kiểm tra hệ thống


          if (saved === 'light' || (!saved && window.matchMedia('(prefers-color-scheme: light)').matches)) {
            this.enableLightTheme();
          } else if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {

            this.enableDarkTheme();
          }
        }

        onSavethemeChange(callback: () => void): void {
            if (!this.isBrowser) return;

            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                if (e.matches) {
                this.enableDarkTheme();
                } else {
                this.enableLightTheme();
                }
                callback();
            });
        }

        isDarkTheme(): boolean {
          return document.documentElement.classList.contains(this.darkClass);
        }



        applyTemplate(templateName: string) {
          document.body.classList.remove('cv-template-default', 'cv-template-image', 'cv-template-no-image');
          document.body.classList.add(`cv-template-${templateName}`);
        }

      }
