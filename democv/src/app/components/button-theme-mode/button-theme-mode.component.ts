import {Component, OnInit} from '@angular/core';
import {ThemeService} from '../../services/theme/theme.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-button-theme-mode',
  imports: [
    NgIf
  ],
  templateUrl: './button-theme-mode.component.html',
  styleUrl: './button-theme-mode.component.scss'
})
export class ButtonThemeModeComponent implements  OnInit{
  isLightTheme = false;
constructor(private themeService: ThemeService) {

}
ngOnInit() {
  const saved = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
  this.isLightTheme = saved === 'light';
}

  onToggleThemeMode(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.isLightTheme = isChecked;

    if (isChecked) {

      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
  }



}
