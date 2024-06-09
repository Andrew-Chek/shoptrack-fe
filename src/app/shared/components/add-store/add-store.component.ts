import { ToasterService } from './../../services/toaster.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StoreService } from '@app/core/api/store.service';
import { StoreApiInterface } from '@app/core/dto/store.api.inteface';
import { DialogControllerService } from '@app/shared/services/dialog-controller.service';
import { Store } from '@ngxs/store';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-add-store',
  templateUrl: './add-store.component.html',
  styleUrls: ['./add-store.component.scss'],
})
export class AddStoreComponent  implements OnInit {

    storeValue = this.dialogService.dialogConfig.data.store;
    storeForm: FormGroup;
    isEditMode: boolean = false;
  
    constructor(
        private fb: FormBuilder, 
        private dialogService: DialogControllerService,
        private store: Store,
        private storeService: StoreService,
        private toasterService: ToasterService
    ) {
        const user = this.store.selectSnapshot(state => state.user.user);
        this.storeForm = this.fb.group({
            name: [user.storeName, Validators.required],
            address: ['', Validators.required],
            location: ['', Validators.required]
        });
    }
  
    ngOnInit() {
        if (this.storeValue) {
            this.isEditMode = true;
            this.storeForm.patchValue(this.storeValue);
        }
    }

    extractSrcFromIframe(iframeHtml: string): string | null {
        const srcRegex = /src="([^"]+)"/;
        
        const match = iframeHtml.match(srcRegex);
        
        if (match && match.length > 1) {
            return match[1];
        } else {
            return null;
        }
    }
  
    submitForm() {
        if(this.isEditMode) {
            this.updateStore();
        } else {
            this.createStore();
        }
    }

    updateStore() {
        const store: StoreApiInterface = {
            store_id: this.storeValue.store_id,
            name: this.storeForm.value.name,
            address: this.storeForm.value.address,
            location: this.storeForm.value.location,
            products: []
        };

        this.storeService.updateStore(store).pipe(
            catchError(error => {
                return this.toasterService.showToaster(error);
            })
        ).subscribe(() => {
            this.dialogService.dialogRef.close(true);
        });
    }

    createStore() {
        const store: StoreApiInterface = {
            store_id: 0,
            name: this.storeForm.value.name,
            address: this.storeForm.value.address,
            location: this.extractSrcFromIframe(this.storeForm.value.location)!,
            products: []
        };

        this.storeService.createStore(store).pipe(
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
