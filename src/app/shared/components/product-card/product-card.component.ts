import { DialogControllerService } from '@app/shared/services/dialog-controller.service';
import { StoreApiInterface } from './../../../core/dto/store.api.inteface';
import { Component, Input, OnInit } from '@angular/core';
import { ProductApiInterface } from '@app/core/dto/product.api.interface';
import { IconEnum } from '@app/core/icons.enum';
import { DialogType } from '@app/core/enums/dialog-type.enum';
import { ChooseListDialogComponent } from '../choose-list-dialog/choose-list-dialog.component';
import { AddProductComponent } from '../add-product/add-product.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {

    constructor(private router: Router, private dialogService: DialogControllerService) { }

    addToCartIcon = IconEnum.AddToCartIcon;
    editIcon = IconEnum.EditIcon;

    @Input() product!: ProductApiInterface;
    @Input() isAdmin!: boolean;
    @Input() isGuest!: boolean;
    @Input() store!: StoreApiInterface;

    ngOnInit(): void {
        this.getRouteUsernameFromUrl();
    }

    getRouteUsernameFromUrl() {
        const url = this.router.url;
        if(url.includes("guest")) {
            this.isGuest = true;
            this.isAdmin = false;
        }
    }

    addToCart() {
        this.dialogService.openDialog(ChooseListDialogComponent, "", DialogType.center, { product: this.product, store: this.store }, "100%", "360px");
    }

    openEditDialog() {
        this.dialogService.openDialog(AddProductComponent, "", DialogType.center, { product: this.product, store: this.store }, "100%", "485px");
    }

}
