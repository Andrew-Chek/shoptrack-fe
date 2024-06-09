import { DiscountApiInterface, DiscountCreateApiInterface } from './../../../core/dto/discount.api.interface';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '@app/core/api/product.service';
import { ProductApiInterface } from '@app/core/dto/product.api.interface';
import { DialogControllerService } from '@app/shared/services/dialog-controller.service';
import { ToasterService } from '@app/shared/services/toaster.service';
import { catchError, concatMap, merge, mergeMap } from 'rxjs';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {

    productValue: ProductApiInterface = this.dialogService.dialogConfig.data.product;
    productForm: FormGroup;
    isEditMode: boolean = false;
    storeId = this.dialogService.dialogConfig.data.store_id;
    store = this.dialogService.dialogConfig.data.store;

    constructor(
        private fb: FormBuilder, 
        private dialogService: DialogControllerService,
        private productService: ProductService,
        private toasterService: ToasterService,
    ) {
        this.productForm = this.fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            price: ['', Validators.required],
            discount: ['']
        });
    }

    ngOnInit() {
        if (this.productValue) {
            this.isEditMode = true;
            this.productForm.patchValue(this.productValue);
        }
    }

    submitForm() {
        if(this.isEditMode) {
            this.updateProduct();
        } else {
            this.createProduct();
        }
    }

    updateProduct() {
        const product: ProductApiInterface = {
            product_id: this.productValue.product_id,
            name: this.productForm.value.name,
            description: this.productForm.value.description,
            price: this.productForm.value.price,
            discounts: [],
        };

        const discount = this.productForm.value.discount;
        const discountInfo: DiscountCreateApiInterface = {
            discount_id: 0,
            amount: discount,
            productId: 0,
            description: `${discount}% off on ${this.productForm.value.name}`,
        }

        this.productService.updateProduct(product).pipe(
            concatMap(response => {
                discountInfo.productId = response.productId;
                return this.productService.createDiscount(discountInfo);
            }),
            catchError(error => {
                return this.toasterService.showToaster(error);
            })
        ).subscribe(() => {
            this.dialogService.dialogRef.close(true);
        });
    }

    createProduct() {
        const discount = this.productForm.value.discount;

        const discountInfo: DiscountCreateApiInterface = {
            discount_id: 0,
            amount: discount,
            productId: 0,
            description: `${discount}% off on ${this.productForm.value.name}`,
        }

        const product: ProductApiInterface = {
            product_id: 0,
            name: this.productForm.value.name,
            description: this.productForm.value.description,
            price: this.productForm.value.price,
            discounts: [],
        };


        this.productService.createProduct(product, this.storeId).pipe(
            concatMap(product => {
                discountInfo.productId = product.product_id;
                return this.productService.createDiscount(discountInfo);
            }),
            catchError(error => {
                return this.toasterService.showToaster(error);
            })
        ).subscribe(() => {
            this.dialogService.dialogRef.close(true);
        });
    }

    dismiss() {
        this.dialogService.closeDialog();
    }
}
