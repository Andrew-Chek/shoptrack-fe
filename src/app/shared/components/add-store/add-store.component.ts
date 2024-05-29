import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogControllerService } from '@app/shared/services/dialog-controller.service';

@Component({
  selector: 'app-add-store',
  templateUrl: './add-store.component.html',
  styleUrls: ['./add-store.component.scss'],
})
export class AddStoreComponent  implements OnInit {

    @Input() store: any;
    storeForm: FormGroup;
    isEditMode: boolean = false;
  
    constructor(private fb: FormBuilder, private dialogService: DialogControllerService) {
        this.storeForm = this.fb.group({
            name: ['', Validators.required],
            address: ['', Validators.required],
            location: ['', Validators.required]
        });
    }
  
    ngOnInit() {
        if (this.store) {
            this.isEditMode = true;
            this.storeForm.patchValue(this.store);
        }
    }
  
    submitForm() {
        if (this.storeForm.valid) {
            this.dialogService.closeDialog;
        }
    }
  
    dismiss() {
        this.dialogService.closeDialog();
    }
}
