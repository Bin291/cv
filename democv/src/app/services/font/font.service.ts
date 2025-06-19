import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FontService {
  private fontClassSubject = new BehaviorSubject<string>('font-Comfortaa'); // mặc định
  fontClass$ = this.fontClassSubject.asObservable();

  setFontClass(fontName: string) {
    const className = `font-${fontName.replace(/\s+/g, '-')}`;
    this.fontClassSubject.next(className);
  }
}
