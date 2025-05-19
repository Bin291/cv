import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ShareModule} from '../../../shared/shared.module';
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatFabButton, MatIconButton} from '@angular/material/button';
import {ContentOptionAddComponent} from '../content-option-add/content-option-add.component';
import {MatDialogRef} from '@angular/material/dialog';
import {AddContentModel} from '../../models/add-content.model';
import {AddContentService} from '../../services/add-content/add-content.service';
import {Observable, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {AddContentState} from '../../ngrx/add-content/add-content.state';
import * as AddContentActions from '../../ngrx/add-content/add-content.action';

@Component({
  selector: 'app-content-dialog',
  imports: [
    ShareModule,
    MatIcon,
    MatIconButton,
    ContentOptionAddComponent,
    MatButton,
    MatFabButton,
  ],
  templateUrl: './content-dialog.component.html',
  styleUrl: './content-dialog.component.scss'
})
export class ContentDialogComponent implements OnInit{
  contentList$ !: Observable<AddContentModel[]>;
  subscription: Subscription[] = [];
  contentAdd: AddContentModel[] = [];




  constructor(private dialogRef: MatDialogRef<ContentDialogComponent>, addContentService: AddContentService,
              private store: Store<{
                addContent: AddContentState
              }>) {

    this.contentList$ = this.store.select('addContent','addContent')
    this.store.dispatch(AddContentActions.loadAddContents());
  }
  @Output() saveEvent = new EventEmitter<void>();
  protected readonly onclose = onclose;

  onSave() {
    this.saveEvent.emit()
    this.dialogRef.close();
  }
  onClose() {
    this.dialogRef.close();
  }


  ngOnInit() {
    this.subscription.push(
      this.contentList$.subscribe((contentList) => {
        if(contentList.length > 0){
          console.log('Content List:', contentList);
        }
        this.contentAdd = contentList;
      })
    )
  }
}
