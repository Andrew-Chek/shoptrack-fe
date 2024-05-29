import { Component, Input, OnInit } from '@angular/core';
import { ListApiInterface } from '@app/core/dto/list.api.interface';
import { ProductApiInterface } from '@app/core/dto/product.api.interface';
import { DialogControllerService } from '@app/shared/services/dialog-controller.service';

@Component({
  selector: 'app-choose-list-dialog',
  templateUrl: './choose-list-dialog.component.html',
  styleUrls: ['./choose-list-dialog.component.scss'],
})
export class ChooseListDialogComponent {

    @Input() shoppingLists: {listInfo: ListApiInterface, products: {product: ProductApiInterface, quantity: number}[]}[] = [
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

    quantity = 1;
    selectedList = this.shoppingLists[0];
    product: ProductApiInterface = {
        product_id: 0,
        name: '',
        description: '',
        price: 0,
        store_id: 0
    }

    constructor(private dialogService: DialogControllerService) {}
  
    dismiss() {
        this.dialogService.closeDialog();
    }

    chooseList(list: typeof this.shoppingLists[0]) {
        this.selectedList = list;
    }
  
    addProductToList() {
        this.selectedList.products.push({product: this.product, quantity: this.quantity});
        this.dismiss();
    }

}
