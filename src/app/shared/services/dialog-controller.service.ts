import { Injectable, Type } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

//libs
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, filter, fromEvent, map, merge, tap } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

//app
import { routes } from '@core/constants/routes.const';

import { DialogType } from '@core/enums/dialog-type.enum';

@UntilDestroy()
@Injectable({
    providedIn: 'root',
})
export class DialogControllerService {
    public dialogRef!: DynamicDialogRef;
    public dialogConfig!: DynamicDialogConfig;

    constructor(private dialogService: DialogService, private router: Router) {
        this.dismissOnClickOutsideOrAuthRoutes();
    }

    openDialog(
        component: Type<any>,
        modalHeader: string,
        dialogType: DialogType = DialogType.bottom,
        data?: any,
        width?: string,
        height?: string
    ): void {
        this.dialogConfig = {
            data: { ...data },
            header: modalHeader,
            baseZIndex: 10000,
            styleClass: 'prime-modal-win animation shopping-cart-dialog',
            transitionOptions: '0ms',
            width,
            height,
            closable: false,
        };

        if (dialogType === DialogType.center) {
            this.dialogConfig.styleClass = 'prime-modal-win-center animation-center';
        }

        if (this.dialogService.dialogComponentRefMap.size === 1) {
            this.dialogRef.destroy();
        }

        this.dialogRef = this.dialogService.open(component, this.dialogConfig);
    }

    closeDialog(dialogType: DialogType = DialogType.bottom) {
        if (dialogType === DialogType.center) {
            this.dialogConfig.styleClass = 'prime-modal-win-center animation-close-center';
        } else {
            this.dialogConfig.styleClass = 'prime-modal-win animation-close';
        }
        setTimeout(() => this.dialogRef.destroy(), 200);
    }

    routerEventsStream(): Observable<NavigationStart> {
        return this.router.events.pipe(
            filter(ev => ev instanceof NavigationStart),
            map(ev => ev as NavigationStart),
            filter(ev => ev.url.includes(routes.auth))
        );
    }

    clickOutsideStream(): Observable<Event> {
        return fromEvent(document, 'click').pipe(
            filter(ev => {
                const target = ev.target as HTMLElement;
                return target.classList.contains('p-component-overlay');
            })
        );
    }

    dismissOnClickOutsideOrAuthRoutes() {
        merge(this.routerEventsStream(), this.clickOutsideStream())
            .pipe(
                untilDestroyed(this),
                filter(() => !!this.dialogRef),
                tap(() => this.dialogRef.destroy())
            )
            .subscribe();
    }
}
