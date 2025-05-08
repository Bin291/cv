import { Component } from '@angular/core';
import {InputcontentComponent} from '../../components/inputcontent/inputcontent.component';


@Component({
  selector: 'app-content',
  imports: [
    InputcontentComponent
  ],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent {

}
