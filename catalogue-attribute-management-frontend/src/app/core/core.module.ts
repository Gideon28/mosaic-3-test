import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BsDropdownModule, ModalModule } from 'ngx-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { FooterComponent } from './components/footer/footer.component';
import { CoreComponent } from './core.component';
import { SupplierDropdownComponent } from './components/supplier-dropdown/supplier-dropdown.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { MosaicIconsComponent } from './components/mosaic-icons/mosaic-icons.component';
import { FileExportComponent } from './components/file-export/file-export.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { ModalComponent } from './components/modal/modal.component';

import { SafeHtmlPipe } from './pipe/safe-html.pipe';
import { TrimPipe } from './pipe/trim.pipe';
import { FilterPipe } from './pipe/filter.pipe';

@NgModule({
  declarations: [
    CoreComponent,
    FooterComponent,
    SupplierDropdownComponent,
    ErrorPageComponent,
    MosaicIconsComponent,
    FileExportComponent,
    FileUploadComponent,
    ModalComponent,

    SafeHtmlPipe,
    TrimPipe,
    FilterPipe
  ],
  imports: [
    FormsModule,
    CommonModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    TranslateModule
  ],
  exports: [
    CoreComponent,
    SupplierDropdownComponent,
    MosaicIconsComponent,
    FileExportComponent,
    FileUploadComponent,
    FilterPipe
  ],
  entryComponents: [
    ModalComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class CoreModule { }
