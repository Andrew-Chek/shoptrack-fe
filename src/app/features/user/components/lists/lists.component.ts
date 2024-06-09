import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListService } from '@app/core/api/list.service';
import { routes } from '@app/core/constants/routes.const';
import { ListApiInterface, ListUpdateApiInterface } from '@app/core/dto/list.api.interface';
import { ProductApiInterface } from '@app/core/dto/product.api.interface';
import { UserApiInterface } from '@app/core/dto/signin.api.interface';
import { DialogType } from '@app/core/enums/dialog-type.enum';
import { IconEnum } from '@app/core/icons.enum';
import { AddListComponent } from '@app/shared/components/add-list/add-list.component';
import { ShoppingCartComponent } from '@app/shared/components/shopping-cart/shopping-cart.component';
import { WarningDialogComponent } from '@app/shared/components/warning-dialog/warning-dialog.component';
import { DialogControllerService } from '@app/shared/services/dialog-controller.service';
import { Store } from '@ngxs/store';
import { Observable, catchError, filter, map } from 'rxjs';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {

    shoppingLists$!: Observable<ListApiInterface[]>
    filteredLists$!: Observable<ListApiInterface[]>

    showArchived: boolean = false;
    total: number = 0;

    backIcon = IconEnum.BackIcon;
    archiveIcon = IconEnum.ArchiveIcon;
    unArchiveIcon = IconEnum.UnArchiveIcon;
    editIcon = IconEnum.EditIcon;
    removeIcon = IconEnum.RemoveIcon;
    calculateIcon = IconEnum.CalculateIcon;

    constructor(
        private router: Router, 
        private dialogService: DialogControllerService,
        private listService: ListService,
        private store: Store
    ) {}

    ngOnInit(): void {
        this.getShoppingLists();
        this.filterLists();
    }

    calculateTotal(list: any) {
        this.total = list.items.reduce((sum: number, item: any) => sum + item.price, 0);
    }

    filterLists() {
        if (this.showArchived) {
            this.filteredLists$ = this.shoppingLists$.pipe(
                map(lists => lists.filter(list => !list.is_active))
            );
        } else {
            this.filteredLists$ = this.shoppingLists$.pipe(
                map(lists => lists.filter(list => list.is_active))
            );
        }
    }

    archiveList(list: ListApiInterface) {
        const opositeToActive = !list.is_active;
        const updatedList: ListApiInterface = {
            list_id: list.list_id,
            user_id: list.user_id,
            name: list.name,
            is_active: opositeToActive,
            products: list.products
        }

        this.listService.updateList(updatedList).subscribe(() => {
            this.getShoppingLists();
            this.filterLists();
        });
    }
    
    openAddListDialog() {
        this.dialogService.openDialog(AddListComponent, '', DialogType.center, null, '100%', '200px');

        this.dialogService.dialogRef.onClose.subscribe((result: boolean) => {
            if(result) {
                this.getShoppingLists();
                this.filterLists();
            }
        });
    }

    openEditListDialog(list: ListApiInterface) {
        this.dialogService.openDialog(AddListComponent, '', DialogType.bottom, {edit: true, list}, '100%', '200px');

        this.dialogService.dialogRef.onClose.subscribe((result: boolean) => {
            if(result) {
                this.getShoppingLists();
                this.filterLists();
            }
        });
    }

    openListDialog(list: ListApiInterface) {
        this.dialogService.openDialog(ShoppingCartComponent, '', DialogType.center, {list, isUser: true}, '100%', '500px');
    }

    openRemoveListDialog(list: ListApiInterface) {
        const message = "The list will be removed with all products in it. Are you sure?";
        this.dialogService.openDialog(WarningDialogComponent, '', DialogType.center, {message}, '100%', '360px');

        this.dialogService.dialogRef.onClose.pipe().subscribe((result: boolean) => {
            if(result) {
                this.listService.deleteList(list.list_id).subscribe(() => {
                    this.getShoppingLists();
                    this.filterLists();
                });
            }
        });

    }

    getShoppingLists() {
        const user = this.store.selectSnapshot(state => state.user.user);
        this.shoppingLists$ = this.listService.getListsByUserId(user.id);
    }

    goBack() {
        this.router.navigate([routes.features,routes.user]);
    }
}
