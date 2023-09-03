
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import {
  ColumnMode,
  DatatableComponent,
  elementsFromPoint,
  SelectionType
} from '@swimlane/ngx-datatable';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DataTabRemService } from 'app/shared/services/dataTabRem.service';
import { DataTabSiteService } from 'app/shared/services/dataTabSite.service';
import { DataTabQuaiService } from 'app/shared/services/dataTabQuai.service';
@Component({
    selector: 'app-extended-table',
    templateUrl: './extended-table.component.html',
    styleUrls: ['/app/data-tables/data-tables.component.scss', '/assets/sass/libs/datatables.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ExtendedTableComponent {
 // public
 public contentHeader: object;

 // row data
 public rows =[];
 IsDataReady:boolean

 // column header
 public columns = [
   
   { name: 'Etat', prop: 'etat' },
  
   { name: 'IdQuai', prop: 'idQuai' },
  
   { name: 'NomQuai', prop: 'nomQuai' },
   
   ];

 // multi Purpose datatable Row data
 ////////////////public multiPurposeRows = DatatableData;

 public ColumnMode = ColumnMode;

 @ViewChild(DatatableComponent) table: DatatableComponent;
 @ViewChild('tableRowDetails') tableRowDetails: any;
 @ViewChild('tableResponsive') tableResponsive: any;

 public expanded: any = {};

 public editing = {};

 public chkBoxSelected = [];
 public SelectionType = SelectionType;

 // server side row data
 public serverSideRowData;

 // private
 private tempData = [];
 private multiPurposeTemp = [];
 private http: HttpClient;
 //DataTableService: DataTabService;

 /**
  * inlineEditingUpdate
  *
  * @param event
  * @param cell
  * @param rowIndex
  */
 inlineEditingUpdate(event, cell, rowIndex) {
   this.editing[rowIndex + '-' + cell] = false;
   this.rows[rowIndex][cell] = event.target.value;
   //this.rows = [...this.rows];
 }

 /**
  * filterUpdate
  *
  * @param code
  */
  Indisponible(id:any)
{
 this.DataTabQService.Indisponible(id).subscribe(
   data => { console.log(data) ,alert("Etat du Quai est changé à indisponible ")}, error => { console.log(error) });

   
};
Disponible(id:any)
{
 this.DataTabQService.Disponible(id).subscribe(
   data => { console.log(data),alert("Etat du Quai est changé à disponible " )}, error => { console.log(error) });
}
 filterUpdate(event) {
   const val = event.target.value.toLowerCase();

   // filter our data
   const temp = this.tempData.filter(function (d) {
     return d.full_name.toLowerCase().indexOf(val) !== -1 || !val;
   });

   // update the rows
   this.rows = temp;
   // Whenever the filter changes, always go back to the first page
   this.table.offset = 0;
 }

 /**
  * rowDetailsToggleExpand
  *
  * @param row
  */
 rowDetailsToggleExpand(row) {
   this.tableRowDetails.rowDetail.toggleExpandRow(row);
 }

 /**
  * toggleExpandRowResponsive
  *
  * @param row
  */
 toggleExpandRowResponsive(row) {
   this.tableResponsive.rowDetail.toggleExpandRow(row);
 }

 /**
  * customChkboxOnSelect
  *
  * @param { selected }
  */
 customChkboxOnSelect({ selected }) {
   this.chkBoxSelected.splice(0, this.chkBoxSelected.length);
   //this.chkBoxSelected.push(...selected);
 }

 /**
  * serverSideSetPage
  *
  * @param event
  */
 serverSideSetPage(event) {
   this.http
     .get('assets/data/datatable-data.json')
     .pipe(map((data) => data as Array<any>))
     .subscribe((data) => {
       this.serverSideRowData = data;
     });
 }

 /**
  * MultiPurposeFilterUpdate
  *
  * @param event
  */
 MultiPurposeFilterUpdate(event) {
   const val = event.target.value.toLowerCase();

   // filter our data
   const temp = this.multiPurposeTemp.filter(function (d) {
     return d.full_name.toLowerCase().indexOf(val) !== -1 || !val;
   });

   // update the rows
   //this.multiPurposeRows = temp;
   // Whenever the filter changes, always go back to the first page
   this.table.offset = 0;
 }

 /**
  * Constructor
  *
  * @param {HttpClient} http
  */

 /*  constructor( http: HttpClient) {
   this.tempData = DatatableData;
   this.multiPurposeTemp = DatatableData;
 }  */

 constructor(private DataTabRService: DataTabRemService,private DataTabSService: DataTabSiteService,private DataTabQService: DataTabQuaiService) {
   this.IsDataReady = false;
   console.log("this.rows");
   console.log(this.rows);

   
     this.DataTabQService.getQuaiList().subscribe(
       data => { console.log(data) }, error => { console.log(error) })  

 }






 // Lifecycle Hooks
 // -----------------------------------------------------------------------------------------------------

 /**
  * On init
  */
 ngOnInit() {

   this.DataTabQService.getQuaiList().subscribe(
     data => { console.log(data) ;
     
       data.forEach(element => {
 
         this.rows.push({ idQuai : element['idQuai'] , etat : element['etat'],nomQuai : element['nomQuai']  });}
    

         );
         console.info('this.rows');console.info(this.rows);
         this.IsDataReady = true;
     }, error => { console.log(error) })


   // Initially load first page


   this.serverSideSetPage({ offset: 0 });

   // content header
   this.contentHeader = {
     headerTitle: 'Datatables',
     actionButton: true,
     breadcrumb: {
       type: '',
       links: [
         {
           name: 'Home',
           isLink: true,
           link: '#'
         },
         {
           name: 'Forms & Tables',
           isLink: true,
           link: ''
         },
         {
           name: 'Datatables',
           isLink: false
         }
       ]
     }
   };
 }
}
