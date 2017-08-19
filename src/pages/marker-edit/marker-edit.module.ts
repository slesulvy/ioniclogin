import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MarkerEditPage } from './marker-edit';

@NgModule({
  declarations: [
    MarkerEditPage,
  ],
  imports: [
    IonicPageModule.forChild(MarkerEditPage),
  ],
})
export class MarkerEditPageModule {}
