import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TablesRoutingModule } from "./tables-routing.module";
import {DecimalPipe} from '@angular/common';
import { ExtendedTableComponent } from "./extended/extended-table.component";
import { BasicComponent } from './basic/basic.component';
import { CrudModalComponent }  from './basic/crud-modal/crud-modal.component';
import { TablesComponent } from './angular/tables.component';
import { NgbdSortableHeader } from './angular/sortable.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';






@NgModule({

    providers: [DecimalPipe],
    imports: [

        CommonModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        TablesRoutingModule,
        NgxDatatableModule,
        HttpClientModule
      
    ],
    declarations: [
        ExtendedTableComponent,
        BasicComponent,
        TablesComponent,
        NgbdSortableHeader,
        CrudModalComponent,
       
    ],
   
})
export class TablesModule { }
