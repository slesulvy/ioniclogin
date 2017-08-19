import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalAutocompleteItemsPage } from './modal-autocomplete-items';

@NgModule({
  declarations: [
    ModalAutocompleteItemsPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalAutocompleteItemsPage),
  ],
})
export class ModalAutocompleteItemsPageModule {}
