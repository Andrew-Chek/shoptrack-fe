import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StoreApiInterface } from '@app/core/dto/store.api.inteface';
import { DialogType } from '@app/core/enums/dialog-type.enum';
import { IconEnum } from '@app/core/icons.enum';
import { DialogControllerService } from '@app/shared/services/dialog-controller.service';
import { AddStoreComponent } from '../add-store/add-store.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { WarningDialogComponent } from '../warning-dialog/warning-dialog.component';
import { StoreService } from '@app/core/api/store.service';

@Component({
    selector: 'app-store-card',
    templateUrl: './store-card.component.html',
    styleUrls: ['./store-card.component.scss'],
})
export class StoreCardComponent implements OnInit {

    constructor(
        private dialogService: DialogControllerService, 
        private sanitizer: DomSanitizer,
        private storeService: StoreService
    ) { }

    @Input() store!: StoreApiInterface;
    @Input() isAdmin = false;

    trustedUrl!: SafeResourceUrl;

    editIcon = IconEnum.EditIcon;
    deleteIcon = IconEnum.RemoveIcon;

    @Output() goneToStorePage = new EventEmitter<StoreApiInterface>();
    @Output() storesChanged = new EventEmitter<void>();

    ngOnInit(): void {
        this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.store.location);
    }

    goToStorePage() {
        this.goneToStorePage.emit(this.store);
    }

    openEditDialog() {
        this.dialogService.openDialog(AddStoreComponent, "", DialogType.center, { store: this.store }, "100%", "360px");

        this.dialogService.dialogRef.onClose.subscribe((result: boolean) => {
            if (result) {
                this.storesChanged.emit();
            }
        });
    }

    openDeleteDialog() {
        this.dialogService.openDialog(WarningDialogComponent, "", DialogType.center, { message: "The store will be deleted! Are you sure?" }, "100%", "360px");

        this.dialogService.dialogRef.onClose.subscribe((result: boolean) => {
            if (result) {
                this.storeService.deleteStore(this.store.store_id).subscribe();
                this.storesChanged.emit();
            }
        });
    }
}   
