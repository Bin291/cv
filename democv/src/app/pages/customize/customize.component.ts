import { Component } from '@angular/core';
import {FontComponent} from '../../customize-components/font/font.component';
import {HeadingComponent} from '../../customize-components/heading/heading.component';
import {HeaderStyleComponent} from '../../customize-components/header-style/header-style.component';
import {NameStyleComponent} from '../../customize-components/name-style/name-style.component';
import {JobTitleComponent} from '../../customize-components/job-title/job-title.component';
import {TemplateSelectorComponent} from '../../customize-components/template-selector/template-selector.component';
import {SpacingControlComponent} from '../../customize-components/spacing-control/spacing-control.component';

@Component({
  selector: 'app-customize',
  imports: [
    FontComponent,
    HeadingComponent,
    HeaderStyleComponent,
    NameStyleComponent,
    JobTitleComponent,
    TemplateSelectorComponent,
    SpacingControlComponent
  ],
  templateUrl: './customize.component.html',
  styleUrl: './customize.component.scss'
})
export class CustomizeComponent {

}
