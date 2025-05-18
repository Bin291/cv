import { Component } from '@angular/core';
import {InputcontentComponent} from '../../components/inputcontent/inputcontent.component';
import {ThemeService} from '../../services/theme/theme.service';


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
