import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { InputModule } from './components/input';
import { ButtonTypeModule } from './components/button';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CheckboxModule } from './components/checkbox/checkbox.module';
import { StoreCardModule } from './components/store-card/store-card.module';
import { ProductCardModule } from './components/product-card/product-card.module';
import { StorePageModule } from './components/store-page/store-page.module';
import { PaginationModule } from './components/pagination/pagination.module';
import { ShoppingCartModule } from './components/shopping-cart/shopping-cart.module';
import { ChooseListDialogModule } from './components/choose-list-dialog/choose-list-dialog.module';
import { AddListModule } from './components/add-list/add-list.module';
import { AddProductModule } from './components/add-product/add-product.module';
import { AddStoreModule } from './components/add-store/add-store.module';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        AngularSvgIconModule,
        InputModule,
        ButtonTypeModule,
        CheckboxModule,
        AddProductModule,
        AddStoreModule,
        StorePageModule,
        StoreCardModule,
        ProductCardModule,
        ShoppingCartModule,
        ChooseListDialogModule,
        AddListModule,
        PaginationModule,
        ReactiveFormsModule,
        TranslateModule
    ],
    exports: [
        CommonModule,
        AngularSvgIconModule,
        InputModule,
        ButtonTypeModule,
        CheckboxModule,
        AddProductModule,
        AddStoreModule,
        StorePageModule,
        StoreCardModule,
        ProductCardModule,
        ShoppingCartModule,
        AddListModule,
        ChooseListDialogModule,
        PaginationModule,
        ReactiveFormsModule,
        TranslateModule
    ]
})
export class SharedModule { }
