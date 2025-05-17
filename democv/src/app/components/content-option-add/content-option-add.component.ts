import {Component, Input, OnInit} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {Store} from '@ngrx/store';
import { AddContentModel} from '../../models/add-content.model';
import {Observable, Subscription} from 'rxjs';
import * as  AddContentActions from '../../ngrx/add-content/add-content.action';
import {AddContentState} from '../../ngrx/add-content/add-content.state';

@Component({
  selector: 'app-content-option-add',
    imports: [
        MatIcon
    ],
  templateUrl: './content-option-add.component.html',
  styleUrl: './content-option-add.component.scss'
})
export class ContentOptionAddComponent implements OnInit{
  @Input() content!: AddContentModel;
  contentList$ !: Observable<AddContentModel[]>;
  subscription: Subscription[] = []

  constructor(private store: Store<{
                addContent: AddContentState
              }>) {

    this.contentList$ = this.store.select('addContent','addContent')
    this.store.dispatch(AddContentActions.loadAddContents());
  }
  ngOnInit() {
 this.subscription.push(
   this.contentList$.subscribe((contentList) => {
     if(contentList.length > 0){
       // console.log('Content List:', contentList);
     }
      })
    )
    }
}
