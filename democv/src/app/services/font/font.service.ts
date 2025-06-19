import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FontService {
  private fontSubject = new BehaviorSubject<string>('Roboto');
  font$ = this.fontSubject.asObservable();

  setFont(font: string) {
    this.fontSubject.next(font);
  }

}
