import { Injectable } from '@angular/core';
import { UserApiInterface } from '../../core/dto/signin.api.interface';

@Injectable({
    providedIn: 'root',
})
export class VaultService {
    private storage = localStorage;

    public setItem<T>(key: string, value: T): void {
        try {
            return this.storage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.warn('[VAULT SERVICE ISSUE]: ', error);
        }
    }

    public getUser(): UserApiInterface | undefined {
        try {
            return JSON.parse(this.storage.getItem('user') as string);
        } catch (error) {
            console.warn('[VAULT SERVICE ISSUE]: ', error);
            return undefined;
        }
    }

    public getToken(): string | undefined {
        try {
            return this.storage.getItem('accessToken') as string;
        } catch (error) {
            console.warn('[VAULT SERVICE ISSUE]: ', error);
            return undefined;
        }
    }

    public getIntermediateToken(): string {
        try {
            return this.storage.getItem('intermediateToken') as string;
        } catch (error) {
            console.warn('[VAULT SERVICE ISSUE]: ', error);
            return '[VAULT SERVICE ISSUE]: Token invalid';
        }
    }

    public setToken(token: string): void {
        try {
            this.storage.setItem('accessToken', `Bearer ${token}`);
        } catch (error) {
            console.warn('[VAULT SERVICE ISSUE]: ', error);
        }
    }

    public setTokenIntermediate(token: string): void {
        try {
            this.storage.setItem('intermediateToken', `Bearer ${token}`);
        } catch (error) {
            console.warn('[VAULT SERVICE ISSUE]: ', error);
        }
    }

    public removeItem(key: string): void {
        this.storage.removeItem(key);
    }

    public removeToken(): void {
        this.removeItem('accessToken');
        this.removeItem('pin');
    }

    public getItem<T = string>(key: string): T {
        try {
            return JSON.parse(this.storage.getItem(key) as string);
        } catch (error) {
            console.warn('[VAULT SERVICE ISSUE]: ', error);
        }

        return this.storage.getItem(key) as unknown as T;
    }

    public clearStorage(): void {
        this.storage.clear();
    }

    public removePrevUserFromLocalStorage() {
        Object.keys(localStorage).forEach(key => {
            if (key !== 'CapacitorStorage.firstTimeOpen') {
                this.removeItem(key);
            }
        });
    }

    public isGuest(): boolean {
        return this.storage.getItem('guest') === 'true';
    }
}
