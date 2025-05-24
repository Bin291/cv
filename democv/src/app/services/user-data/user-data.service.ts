import { Injectable } from '@angular/core';
import {PersonalInfo} from '../../models/personal-info';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private infoSubject = new BehaviorSubject<PersonalInfo>({
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
  });

  personalInfo$ = this.infoSubject.asObservable();

  update(info: Partial<PersonalInfo>) {
    this.infoSubject.next({ ...this.infoSubject.value, ...info });
  }
  constructor() { }
}
