import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {

    constructor() { }

    @Input() currentPage: number = 1;
    @Output() pageChange = new EventEmitter<number>();

    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.pageChange.emit(this.currentPage);
        }
    }

    nextPage() {
        this.currentPage++;
        this.pageChange.emit(this.currentPage);
    }
}
