import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {NgIf} from "@angular/common";
import {ShareModule} from "../../../shared/shared.module";
import {Observable, Subscription} from 'rxjs';
import {AddContentModel} from '../../models/add-content.model';
import {MatDialog} from '@angular/material/dialog';
import {Store} from '@ngrx/store';
import {AddContentState} from '../../ngrx/add-content/add-content.state';
import * as AddContentActions from '../../ngrx/add-content/add-content.action';
import {ContentDialogComponent} from '../content-dialog/content-dialog.component';
import {CooperComponent} from '../cooper/cooper.component';

@Component({
  selector: 'app-download-box',
    imports: [
        MatIcon,
        NgIf,
        ShareModule
    ],
  templateUrl: './download-box.component.html',
  styleUrl: './download-box.component.scss'
})
export class DownloadBoxComponent {
  resumeTitle: string = 'Resume 1';
  isEditing: boolean = false;
  contentList$ !: Observable<AddContentModel[]>;
  constructor( private store: Store<{
    addContent: AddContentState
  }>) {
    this.contentList$ = this.store.select('addContent', 'addContent')
    this.store.dispatch(AddContentActions.loadAddContents());

  }


  editTitle() {
    this.isEditing = true;
  }
  saveTitle() {
    this.isEditing = false;
  }
  cancelEdit() {
    this.isEditing = false;
    this.resumeTitle = 'Resume 1';
  }


}
