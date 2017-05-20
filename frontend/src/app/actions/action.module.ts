import { NgModule }       from '@angular/core';
import { ActionDetailComponent } from './edit/action-detail-component';
import { ActionComponent }     from './actions.component';

import {ActionCreateComponent} from './create/action-create.component';
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    RouterModule
  ],
  declarations: [
    ActionDetailComponent,
    ActionCreateComponent,
    ActionComponent,
  ],
})

export class ActionModule {
}


