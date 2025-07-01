import {
  ApplicationConfig,
  importProvidersFrom,
  LOCALE_ID,
  provideZoneChangeDetection,
} from '@angular/core';

import {
  PreloadAllModules,
  provideRouter,
  withPreloading,
} from '@angular/router';

import { APP_ROUTES } from './app.routes';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(APP_ROUTES, withPreloading(PreloadAllModules)),
    provideHttpClient(
      withInterceptors([
        // loadingInterceptor,
      ])
    ),
    importProvidersFrom(BrowserModule, BrowserAnimationsModule, CommonModule),
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR',
    },
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
  ],
};
