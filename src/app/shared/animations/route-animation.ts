import {
    trigger,
    style,
    transition,
    animate,
    animateChild,
    group,
    query,
    AnimationTriggerMetadata,
    state,
} from '@angular/animations';

export const routeAnimation: AnimationTriggerMetadata = trigger('animateRouteNavigation', [
    transition('40 => *, 30 => 20, 30 => 10, 20 => 10', slideTo('left')),
    transition('10 => *, 20 => 30, 20 => 40, 30 => 40', slideTo('right')),
    transition('* <=> *', slideTo('right')),
]);

function slideTo(direction: 'left' | 'right') {
    const optional = { optional: true };
    return [
        query(
            ':enter, :leave',
            [
                style({
                    position: 'absolute',
                    width: '100%',
                }),
            ],
            optional
        ),
        query(':enter', [style({ [direction]: '-100%' })]),
        query(':leave', animateChild(), optional),

        group([
            query(':leave', [animate('500ms ease-in-out', style({ [direction]: '100%', opacity: 0 }))], optional),
            query(':enter', [animate('500ms ease-in-out', style({ [direction]: '0%' }))], optional),
            query('@*', animateChild(), optional),
        ]),
    ];
}

export const deskRouteAnimation = trigger('animateDeskRouteNavigation', [
    transition('* <=> *', [
        style({ position: 'relative', overflow: 'hidden' }),
        query(
            ':enter, :leave',
            [
                style({
                    position: 'absolute',
                    width: '100%',
                }),
            ],
            { optional: true }
        ),
        query(':enter', [style({ right: '-100%' })], { optional: true }),
        query(':leave', animateChild(), { optional: true }),
        group([
            query(':leave', [animate('500ms ease-in-out', style({ right: '100%', opacity: 0 }))], { optional: true }),
            query(':enter', [animate('500ms ease-in-out', style({ right: '0%' }))], { optional: true }),
            query('@*', animateChild(), { optional: true }),
        ]),
    ]),
]);
