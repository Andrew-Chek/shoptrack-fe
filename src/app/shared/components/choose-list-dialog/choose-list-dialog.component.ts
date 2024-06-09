import { ListService } from '@app/core/api/list.service';
import { Component, Input, OnInit } from '@angular/core';
import { ListApiInterface } from '@app/core/dto/list.api.interface';
import { ProductApiInterface } from '@app/core/dto/product.api.interface';
import { DialogControllerService } from '@app/shared/services/dialog-controller.service';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { DialogType } from '@app/core/enums/dialog-type.enum';

@Component({
  selector: 'app-choose-list-dialog',
  templateUrl: './choose-list-dialog.component.html',
  styleUrls: ['./choose-list-dialog.component.scss'],
})
export class ChooseListDialogComponent implements OnInit {

    shoppingLists$!: Observable<ListApiInterface[]>;

    quantity = 1;
    selectedList!: ListApiInterface;
    product: ProductApiInterface = this.dialogService.dialogConfig.data.product;

    constructor(
        private dialogService: DialogControllerService,
        private listService: ListService,
        private store: Store
    ) {}

    ngOnInit(): void {
        this.getShoppingLists();
        this.shoppingLists$.subscribe(lists => {
            this.selectedList = lists[0];
        });
    }

    getShoppingLists() {
        const user = this.store.selectSnapshot(state => state.user.user);
        this.shoppingLists$ = this.listService.getListsByUserId(user.id);
    }
  
    dismiss() {
        this.dialogService.closeDialog();
    }

    chooseList(list: ListApiInterface) {
        this.selectedList = list;
    }
  
    addProductToList() {
        this.selectedList.products.push(this.product);
        this.listService.updateList(this.selectedList).subscribe(() => {
            this.dialogService.dialogRef.close(true);
            this.dialogService.openDialog(SuccessDialogComponent, "", DialogType.center, { message: "The product was successfully added to the list!" }, "100%", "360px");
        });
    }

}
