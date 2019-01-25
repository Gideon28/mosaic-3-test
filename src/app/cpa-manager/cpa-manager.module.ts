import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TabsModule } from 'ngx-bootstrap';

import { CoreModule } from '../core/core.module';

import { CpaManagerComponent } from './cpa-manager.component';
import { UploadTableComponent } from './components/upload-table/upload-table.component';
import { DownloadTableComponent } from './components/download-table/download-table.component';

import { CpaManagerService } from './service/cpa-manager.service';

import { reducers } from './store/reducers';
import { effects } from './store/effects';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CpaManagerComponent,
    UploadTableComponent,
    DownloadTableComponent
  ],
  imports: [
    CoreModule,
    HttpClientModule,
    CommonModule,
    StoreModule.forFeature('cpa-manager', reducers),
    EffectsModule.forFeature(effects),
    TranslateModule,
    TabsModule.forRoot()
  ],
  exports: [
    CpaManagerComponent
  ],
  providers: [CpaManagerService],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class CpaManagerModule { }
