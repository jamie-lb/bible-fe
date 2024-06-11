import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {BibleService} from "./services/bible.service";
import {provideHttpClient} from "@angular/common/http";
import {provideAnimations} from "@angular/platform-browser/animations";

export const appConfig: ApplicationConfig = {
    providers: [
        BibleService,
        provideZoneChangeDetection({eventCoalescing: true}),
        provideAnimations(),
        provideHttpClient(),
        provideRouter(routes)
    ]
};
