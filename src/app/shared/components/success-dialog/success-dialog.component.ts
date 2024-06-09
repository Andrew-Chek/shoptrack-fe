import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DialogControllerService } from '@app/shared/services/dialog-controller.service';

@Component({
  selector: 'app-success-dialog',
  templateUrl: './success-dialog.component.html',
  styleUrls: ['./success-dialog.component.scss'],
})
export class SuccessDialogComponent  implements OnInit {

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
}
