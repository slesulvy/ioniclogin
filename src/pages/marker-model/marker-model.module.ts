import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MarkerModelPage } from './marker-model';

@NgModule({
  declarations: [
    MarkerModelPage,
  ],
  imports: [
    IonicPageModule.forChild(MarkerModelPage),
  ],
})
export class MarkerModelPageModule {}
