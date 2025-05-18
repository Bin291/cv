import {Component, OnInit} from '@angular/core';
import {ThemeService} from '../../services/theme/theme.service';

@Component({
  selector: 'app-button-theme-mode',
  imports: [],
  templateUrl: './button-theme-mode.component.html',
  styleUrl: './button-theme-mode.component.scss'
})
export class ButtonThemeModeComponent implements  OnInit{
  isLightTheme = false;
constructor(private themeService: ThemeService) {

}
ngOnInit() {
  if (typeof window !== 'undefined' && localStorage) {
    const theme = localStorage.getItem('theme');
    this.isLightTheme = theme === 'light';
  }
}
  onToggleTheme(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.isLightTheme = checkbox.checked;

    if (this.isLightTheme) {
      this.themeService.enableLightTheme();
    } else {
      this.themeService.enableDarkTheme();
    }
  }

}
