import {Component, OnInit} from '@angular/core';
import {UserDataService} from '../../services/user-data/user-data.service';
import {Observable} from 'rxjs';
import {PersonalInfo} from '../../models/personal-info';
import {AsyncPipe, NgIf} from '@angular/common';

@Component({
  selector: 'app-cv',
  imports: [
    NgIf,
    AsyncPipe,
  ],
  templateUrl: './cv.component.html',
  styleUrl: './cv.component.scss'
})
export class CVComponent implements OnInit{
  data$: Observable<PersonalInfo> | undefined;
constructor(private userData: UserDataService) {
this.data$= this.userData.personalInfo$;
}

ngOnInit() {
  this.data$?.subscribe((data) => {
    console.log('📄 CVComponent - Dữ liệu cá nhân:', data);
  });
}

}
