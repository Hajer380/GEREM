import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DataTablesRoutingModule } from "./data-tables-routing.module";

import { DataTablesComponent } from './data-tables.component';
import { PipeModule } from 'app/shared/pipes/pipe.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CrudModalComponent } from './crud-modal/crud-modal.component';
import { AuthGuard } from 'app/shared/auth/auth-guard.service';
import { ChefGuard } from 'app/shared/auth/chef.guard';

@NgModule(
  {providers:[ ChefGuard  ] ,
    imports: [
        CommonModule,
        DataTablesRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgxDatatableModule,
        PipeModule
    ],
    declarations: [
      DataTablesComponent,
      CrudModalComponent

    ]
   
})
export class DataTablesModule { }
