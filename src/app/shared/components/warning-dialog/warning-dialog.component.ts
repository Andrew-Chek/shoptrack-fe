import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { DialogControllerService } from '@app/shared/services/dialog-controller.service';

@Component({
  selector: 'app-warning-dialog',
  templateUrl: './warning-dialog.component.html',
  styleUrls: ['./warning-dialog.component.scss']
})
export class WarningDialogComponent implements OnInit{
    @Input() message: string = 'Are you sure you want to proceed?';
    @Output() confirm = new EventEmitter<boolean>();

    constructor(private dialogservice: DialogControllerService) { }

    ngOnInit(): void {
        this.message = this.dialogservice.dialogConfig.data.message;
    }

    onConfirm() {
        this.confirm.emit(true);
        this.dialogservice.dialogRef.close(true);
    }

    onReject() {
        this.confirm.emit(false);
        this.dialogservice.dialogRef.close(false);
    }
}
