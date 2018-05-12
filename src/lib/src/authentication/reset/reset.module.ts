import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {MatButtonModule, MatInputModule} from '@angular/material';
import {RouterModule} from '@angular/router';
import {ScrLoadingModule} from '@scienceroot/design';
import {ScrPasswordResetComponent} from './reset.component';
import {ScrPasswordResetService} from './reset.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatInputModule,
    ScrLoadingModule
  ],
  declarations: [
    ScrPasswordResetComponent
  ],
  exports: [
    ScrPasswordResetComponent
  ],
  providers: [
    ScrPasswordResetService
  ]
})
export class ScrPasswordResetModule {

}
