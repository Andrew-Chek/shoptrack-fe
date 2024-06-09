import { GuestCartService } from './../../services/guest-cart.service';
import { DialogControllerService } from '@app/shared/services/dialog-controller.service';
import { StoreApiInterface } from './../../../core/dto/store.api.inteface';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductApiInterface } from '@app/core/dto/product.api.interface';
import { IconEnum } from '@app/core/icons.enum';
import { DialogType } from '@app/core/enums/dialog-type.enum';
import { ChooseListDialogComponent } from '../choose-list-dialog/choose-list-dialog.component';
import { AddProductComponent } from '../add-product/add-product.component';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { WarningDialogComponent } from '../warning-dialog/warning-dialog.component';
import { ProductService } from '@app/core/api/product.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {

    constructor(
        private dialogService: DialogControllerService,
        private guestCartService: GuestCartService,
        private productService: ProductService
    ) { }

    addToCartIcon = IconEnum.AddToCartIcon;
    editIcon = IconEnum.EditIcon;
    deleteIcon = IconEnum.RemoveIcon;

    @Input() product!: ProductApiInterface;
    @Input() routeUsername!: string;
    @Input() store!: StoreApiInterface;

    @Output() productsChanged = new EventEmitter<void>();

    addToCart() {
        if(this.routeUsername === "guest") {
            const message = "The product was successfully added to the cart!";
            this.dialogService.openDialog(SuccessDialogComponent, "", DialogType.center, { message }, "100%", "360px");
            this.dialogService.dialogRef.onClose.subscribe((result: boolean) => {
                this.guestCartService.addProduct(this.product);
            });
        }
        else if(this.routeUsername === "user") {
            this.dialogService.openDialog(ChooseListDialogComponent, "", DialogType.center, { product: this.product }, "100%", "360px");
        }
    }

    openEditDialog() {
        this.dialogService.openDialog(AddProductComponent, "", DialogType.center, { product: this.product, store: this.store }, "100%", "485px");

        this.dialogService.dialogRef.onClose.subscribe((result: boolean) => {
            if (result) {
                this.productsChanged.emit();
            }
        });
    }

    openDeleteDialog() {
        this.dialogService.openDialog(WarningDialogComponent, "", DialogType.center, { message: "The store will be deleted! Are you sure?" }, "100%", "360px");

        this.dialogService.dialogRef.onClose.subscribe((result: boolean) => {
            if (result) {
                this.productService.deleteProduct(this.product.product_id).subscribe();
                this.productsChanged.emit();
            }
        });
    }

}
