import { Component } from '@angular/core';
import { ListService } from '@app/core/api/list.service';
import { ListApiInterface, ListCreateApiInterface } from '@app/core/dto/list.api.interface';
import { DialogControllerService } from '@app/shared/services/dialog-controller.service';
import { Store } from '@ngxs/store';

@Component({
    selector: 'app-add-list',
    templateUrl: './add-list.component.html',
    styleUrls: ['./add-list.component.scss']
})
export class AddListComponent {

    edit: boolean = this.dialogService.dialogConfig.data.edit;
    listName: string = !this.edit ? '' : this.dialogService.dialogConfig.data.list?.name;
    title = !this.edit ? "Add shopping list" : "Edit shopping list";
    buttonTitle = !this.edit ? "Add list" : "Save changes";

    list: ListApiInterface | undefined = this.dialogService.dialogConfig.data.list;

    constructor(
        private dialogService: DialogControllerService,
        private listService: ListService,
        private store: Store
    ) {}

    addList() {
        const user = this.store.selectSnapshot(state => state.user.user);
        const list: ListCreateApiInterface = {
            userId: user.id,
            name: this.listName,
            isActive: true,
            products: []
        };

        this.listService.createList(list).subscribe(() => {
            this.dialogService.dialogRef.close(true);
        });
    }

    editList() {
        const user = this.store.selectSnapshot(state => state.user.user);
        const list: ListApiInterface = {
            list_id: this.list?.list_id!,
            user_id: user.id,
            name: this.listName,
            is_active: this.list?.is_active!,
            products: this.list?.products!,
        };

        this.listService.updateList(list).subscribe(() => {
            this.dialogService.dialogRef.close(true);
        });
    }

    dismiss() {
        this.dialogService.closeDialog();
    }
}
