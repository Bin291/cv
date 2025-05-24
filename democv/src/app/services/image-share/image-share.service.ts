import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageShareService {
  private croppedImageSource = new BehaviorSubject<string | null>(null);
  croppedImage$ = this.croppedImageSource.asObservable();

  updateCroppedImage(img: string) {
    this.croppedImageSource.next(img);
  }
}
