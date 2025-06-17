import {Component, EventEmitter, Input, Output} from '@angular/core';
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
import {AddContentService} from '../../services/add-content/add-content.service';

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
    MatIconButton,
  ],
  templateUrl: './content-info-added.component.html',
  styleUrl: './content-info-added.component.scss'
})
export class ContentInfoAddedComponent {
  @Input() contentData!: { content: string; data: any[] };
  @Output() editItem = new EventEmitter<{ content: string; data: any }>();
  isOpen = true;
  @Output() itemsChange = new EventEmitter<any[]>(); // định nghĩa đúng

  constructor(private addContentService: AddContentService) {}

  get items(): any[] {
    return this.contentData.data;
  }


  renderDateRange(item: any): string {
    const {
      startMonth, startYear, endMonth, endYear,
      startDontShow, startOnlyYear,
      endDontShow, endOnlyYear, present
    } = item;

    let start = '';
    let end = '';

    if (!startDontShow && startYear) {
      start = startOnlyYear ? `${startYear}` : `${startMonth || ''} ${startYear}`;
    }

    if (present) {
      end = 'Present';
    } else if (!endDontShow && endYear) {
      end = endOnlyYear ? `${endYear}` : `${endMonth || ''} ${endYear}`;
    }

    if (start && end) return `${start} – ${end}`;
    if (start) return `Start: ${start}`;
    if (end) return `End: ${end}`;
    return '';
  }

  resolveName(content: string, d: any): string {
    if (['Education', 'Professional Experience', 'Projects', 'Organizations'].includes(content)) {
      const title = d.title || '';
      const subtitle = d.subtitle ? ' – ' + d.subtitle : '';
      return `${title}${subtitle}` || 'Untitled';
    }

    return d.name || d.title || '';
  }


  renderLocation(d: any): string {
    const parts = [d.city, d.country].filter(Boolean);
    return parts.length ? ' | ' + parts.join(', ') : '';
  }


  renderDetails(d: any): string {
    const date = this.renderDateRange(d);
    const location = this.renderLocation(d);
    return `${date}${location}`;
  }

  renderHTML(html: string): string {
    return html?.replace(/<[^>]+>/g, '').trim(); // nếu muốn hiện raw, giữ nguyên
  }

  addItem(e: MouseEvent) {
    e.stopPropagation();
    this.addContentService.selectContent(this.contentData.content);
  }

  deleteItem(i: number) {
    this.items.splice(i, 1);
    this.itemsChange.emit(this.items);

  }

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.contentData.data, event.previousIndex, event.currentIndex);
  }
  onClickItem(item: any) {
    this.editItem.emit({ content: this.contentData.content, data: item });
  }

}
