import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RouteAnimationService } from '@core/services/route-animation.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  constructor(private translateService: TranslateService, public animationService: RouteAnimationService) {}

    ngOnInit(): void {
        this.translateService.setDefaultLang('en');
        this.translateService.use('en');
    }
}
