import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { CpaManagerModule } from './cpa-manager/cpa-manager.module';

import { AppComponent } from './app.component';

import { LoadingIndicatorService } from './core/service/loading-indicator.service';
import { LoadingIndicatorInterceptorService } from './core/service/interceptor/loading-indicator-interceptor.service';

import { createTranslateLoader } from './core/utils/translate-loader.util';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CpaManagerModule,
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule,

    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    LoadingIndicatorService,
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: (service: LoadingIndicatorService) => new LoadingIndicatorInterceptorService(service),
      multi: true,
      deps: [LoadingIndicatorService]
    }
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
