import { Injectable } from '@angular/core';
import { Router, ChildrenOutletContexts } from '@angular/router';

//libs
import { UntilDestroy } from '@ngneat/until-destroy';
import { BehaviorSubject, Observable, filter, map } from 'rxjs';

//app
import { routes } from '@core/constants/routes.const';

@UntilDestroy()
@Injectable({
    providedIn: 'root',
})
export class RouteAnimationService {
    private animationState = new BehaviorSubject<string>('defaultAnimation');

    getAnimationState(): Observable<string> {
        return this.animationState.asObservable();
    }

    setAnimationState(animation: string) {
        this.animationState.next(animation);
    }

    constructor(private router: Router, private contexts: ChildrenOutletContexts) {}

    routeDataStream() {
        return this.contexts.getContext('primary')?.route?.data.pipe(
            filter(() => !this.router.url.includes(routes.home)),
            map(data => data['order'])
        );
    }
}
