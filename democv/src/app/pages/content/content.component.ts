import { Component } from '@angular/core';
import {InputcontentComponent} from '../../components/inputcontent/inputcontent.component';
import { EditDetailsComponent } from "../../components/edit-details/edit-details.component";


@Component({
  selector: 'app-content',
  imports: [
    InputcontentComponent,
    EditDetailsComponent
],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent {

}
