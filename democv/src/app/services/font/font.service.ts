import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FontService {
  private fontClassSubject = new BehaviorSubject<string>('font-Lexend'); // default
  fontClass$ = this.fontClassSubject.asObservable();

  setFont(fontName: string): void {
    const fontClass = `font-${fontName.replace(/\s+/g, '')}`;
    console.log('[FontService] Set font class:', fontClass);
    this.fontClassSubject.next(fontClass);
  }

  getCurrentFont(): string {
    return this.fontClassSubject.value;
  }
}
