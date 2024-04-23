import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
    providedIn: 'root',
})
export class ToasterService {
    constructor(private toastController: ToastController) {}

    public async showToaster(message: string): Promise<void> {
        const toast = await this.toastController.create({
            message,
            duration: 1500,
            position: 'top',
        });

        await toast.present();
    }
}
