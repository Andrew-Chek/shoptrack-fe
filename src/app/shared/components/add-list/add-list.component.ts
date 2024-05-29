import { Component } from '@angular/core';
import { DialogControllerService } from '@app/shared/services/dialog-controller.service';

@Component({
    selector: 'app-add-list',
    templateUrl: './add-list.component.html',
    styleUrls: ['./add-list.component.scss']
})
export class AddListComponent {
    listName: string = '';
    listDescription: string = '';

    constructor(private dialogService: DialogControllerService) {}

    addList() {
        // Logic to add the list
        console.log('List Name:', this.listName);
        console.log('List Description:', this.listDescription);
        this.dismiss();
    }

    dismiss() {
        this.dialogService.closeDialog();
    }
}
