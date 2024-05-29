import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'app/shared/shared.module';

// Routing modules for lazy loading
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { StoreModule } from './store/store.module';
// import { TokenInterceptor } from './core/guards/token.interceptor';
import { IonicModule } from '@ionic/angular';
import { AuthService } from './core/api/auth.service';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';

@NgModule({
    declarations: [AppComponent],
    imports: [
        AppRoutingModule,
        ReactiveFormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        IonicModule.forRoot({}),
        AngularSvgIconModule.forRoot(),
        NgxsModule.forRoot(),
        NgxsReduxDevtoolsPluginModule.forRoot(),
        HttpClientModule,
        SharedModule,
        StoreModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (http: HttpClient) => {
                    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
                },
                deps: [HttpClient],
            },
        }),
    ],

    providers: [
        AuthService,
        DialogService,
        DynamicDialogConfig
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
