import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from '@app/core/constants/routes.const';
import { ListApiInterface } from '@app/core/dto/list.api.interface';
import { ProductApiInterface } from '@app/core/dto/product.api.interface';
import { DialogType } from '@app/core/enums/dialog-type.enum';
import { IconEnum } from '@app/core/icons.enum';
import { AddListComponent } from '@app/shared/components/add-list/add-list.component';
import { DialogControllerService } from '@app/shared/services/dialog-controller.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent {

    shoppingLists: {listInfo: ListApiInterface, products: {product: ProductApiInterface, quantity: number}[]}[] = [
        {
            listInfo: {
                list_id: 1,
                user_id: 1,
                name: 'Groceries',
                is_active: true
            },
            products: [
                {
                    product: {
                        product_id: 1,
                        name: 'Milk',
                        description: '2L',
                        price: 2.99,
                        store_id: 1
                    },
                    quantity: 1
                },
                {
                    product: {
                        product_id: 2,
                        name: 'Bread',
                        description: 'White',
                        price: 1.99,
                        store_id: 1
                    },
                    quantity: 1
                }
            ]
        },
        {
            listInfo: {
                list_id: 2,
                user_id: 1,
                name: 'Hardware',
                is_active: true
            },
            products: [
                {
                    product: {
                        product_id: 3,
                        name: 'Hammer',
                        description: 'Claw',
                        price: 12.99,
                        store_id: 2
                    },
                    quantity: 1
                },
                {
                    product: {
                        product_id: 4,
                        name: 'Screwdriver',
                        description: 'Phillips',
                        price: 7.99,
                        store_id: 2
                    },
                    quantity: 1
                }
            ]
        }
    ];

    showArchived: boolean = false;
    total: number = 0;

    backIcon = IconEnum.BackIcon;
    
    constructor(private router: Router, private dialogService: DialogControllerService) {}
    
    calculateTotal(list: any) {
        this.total = list.items.reduce((sum: number, item: any) => sum + item.price, 0);
    }

    filterLists() {
        return this.showArchived ? this.shoppingLists : this.shoppingLists.filter(l => l.listInfo.is_active);
    }
    
    archiveList(list: any) {
        this.shoppingLists = this.shoppingLists.filter(l => l !== list);
    }
    
    openAddListDialog() {
        this.dialogService.openDialog(AddListComponent, '', DialogType.bottom, null, '100%', '60%');
    }

    goBack() {
        this.router.navigate([routes.features,routes.user]);
    }

    openEditListDialog(list: ListApiInterface) {
        // this.dialogService.openDialog(AddListDialogComponent, '', DialogType.bottom, list, '100%', '40%');
    }
}
