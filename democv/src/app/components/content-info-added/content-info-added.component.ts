import { Component } from '@angular/core';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatIconButton} from '@angular/material/button';
import {NgForOf, NgIf} from '@angular/common';
import {ShareModule} from '../../../shared/shared.module';
import {MatInput} from '@angular/material/input';
import {
  MatExpansionPanel,
  MatExpansionPanelActionRow,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';

@Component({
  selector: 'app-content-info-added',
  imports: [
    CdkDrag,
    MatIcon,
    CdkDropList,
    NgForOf,
    ShareModule,
    MatButton,
    MatExpansionPanel,
    MatExpansionPanelActionRow,
    MatExpansionPanelTitle,
    MatExpansionPanelHeader,
  ],
  templateUrl: './content-info-added.component.html',
  styleUrl: './content-info-added.component.scss'
})
export class ContentInfoAddedComponent {
  isOpen = false;
  items = [
    { name: 'info 1', details: 'afw' },
    { name: 'info 2', details: 'afwef...' }
  ];

  addItem(event: Event) {
    event.stopPropagation();
    this.items.push({ name: `info ${this.items.length + 1}`, details: '...' });
  }

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  }
}
