import { Component } from '@angular/core';
import {InputcontentComponent} from '../../components/inputcontent/inputcontent.component';
import { EditDetailsComponent } from "../../components/edit-details/edit-details.component";
import {ThemeService} from '../../services/theme/theme.service';
import {NgIf} from '@angular/common';
import {DownloadBoxComponent} from '../../components/download-box/download-box.component';
import {MatProgressSpinner} from '@angular/material/progress-spinner';



@Component({
  selector: 'app-content',
  imports: [
    InputcontentComponent,
    EditDetailsComponent,
    NgIf,
    DownloadBoxComponent,
    MatProgressSpinner
  ],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent {
  showEdit = false;
  isLoading = false;
  switchToEdit() {
    this.isLoading = true;
    setTimeout(() => {
      this.showEdit = true;
      this.isLoading = false;
    }, 500); // giả lập thời gian loading
  }

  backToInput() {
    this.isLoading = true;
    setTimeout(() => {
      this.showEdit = false;
      this.isLoading = false;
    }, 500); // giả lập thời gian loading
  }
}
