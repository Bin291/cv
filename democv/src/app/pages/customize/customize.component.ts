import {Component, ElementRef, ViewChild} from '@angular/core';
import {MatButtonModule, MatIconButton} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatLabel} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { MatCardModule} from '@angular/material/card';
import {NgForOf} from '@angular/common';



@Component({
  selector: 'app-customize',
  imports: [

    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatCheckboxModule,
    MatCheckboxModule,
    MatCardModule,

  ],
  templateUrl: './customize.component.html',
  styleUrl: './customize.component.scss'
})
export class CustomizeComponent {

}
