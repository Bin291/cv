// customize.component.ts
import { Component } from '@angular/core';
import { FontComponent } from '../../customize-components/font/font.component';
import { HeadingComponent } from '../../customize-components/heading/heading.component';
import { HeaderStyleComponent } from '../../customize-components/header-style/header-style.component';
import { NameStyleComponent } from '../../customize-components/name-style/name-style.component';
import { JobTitleComponent } from '../../customize-components/job-title/job-title.component';
import { TemplateSelectorComponent } from '../../customize-components/template-selector/template-selector.component';
import { SpacingControlComponent } from '../../customize-components/spacing-control/spacing-control.component';
import { StyleService } from '../../services/style/style.service';

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
  size: string = 'M';
  position: string = 'Below';
  fontStyle: string = 'Normal';

  constructor(private styleService: StyleService) {}

  onSizeChange(newSize: string) {
    this.size = newSize;
  }

  onPositionChange(newPosition: string) {
    this.position = newPosition;
  }

  onFontStyleChange(newStyle: string) {
    this.fontStyle = newStyle;
  }

  onSpacingChange(key: string, value: number) {
    switch (key) {
      case 'fontSize':
        this.styleService.updateFontSize(value);
        break;
      case 'lineHeight':
        this.styleService.updateLineHeight(value);
        break;
      case 'marginX':
        this.styleService.updateMarginX(value);
        break;
      case 'marginY':
        this.styleService.updateMarginY(value);
        break;
      case 'spacingBetween':
        this.styleService.updateSpacingBetween(value);
        break;
    }
  }
}
