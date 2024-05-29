import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogControllerService } from '@app/shared/services/dialog-controller.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {

    @Input() product: any;
    productForm: FormGroup;
    isEditMode: boolean = false;

    constructor(private fb: FormBuilder, private dialogService: DialogControllerService) {
        this.productForm = this.fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            price: ['', Validators.required],
            discount: ['']
        });
    }

    ngOnInit() {
        if (this.product) {
            this.isEditMode = true;
            this.productForm.patchValue(this.product);
        }
    }

    submitForm() {
        if (this.productForm.valid) {
            this.dialogService.closeDialog();
        }
    }

    dismiss() {
        this.dialogService.closeDialog();
    }
}
