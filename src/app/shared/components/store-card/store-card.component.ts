import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StoreApiInterface } from '@app/core/dto/store.api.inteface';
import { DialogType } from '@app/core/enums/dialog-type.enum';
import { IconEnum } from '@app/core/icons.enum';
import { DialogControllerService } from '@app/shared/services/dialog-controller.service';
import { AddStoreComponent } from '../add-store/add-store.component';

@Component({
    selector: 'app-store-card',
    templateUrl: './store-card.component.html',
    styleUrls: ['./store-card.component.scss'],
})
export class StoreCardComponent   {

    constructor(private dialogService: DialogControllerService) { }

    @Input() store!: StoreApiInterface;
    @Input() isAdmin = false;

    editIcon = IconEnum.EditIcon;

    @Output() goneToStorePage = new EventEmitter<StoreApiInterface>();

    goToStorePage() {
        this.goneToStorePage.emit(this.store);
    }

    openEditDialog() {
        this.dialogService.openDialog(AddStoreComponent, "", DialogType.center, { store: this.store }, "100%", "360px");
    }
}   
