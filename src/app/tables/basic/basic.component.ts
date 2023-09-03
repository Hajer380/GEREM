import { Component, OnInit, ViewEncapsulation, ViewChild,QueryList, ViewChildren } from '@angular/core';

import {DecimalPipe} from '@angular/common';

import {fromEvent, Observable} from 'rxjs';

import {Site} from './site';
import {NgbdSortableHeader, SortEvent} from './sortable.directive';

//import { DatatableData } from '../data/datatables.data';
import {
  ColumnMode,
  DatatableComponent,
  elementsFromPoint,
  SelectionType
} from '@swimlane/ngx-datatable';
import { HttpClient } from '@angular/common/http';
import { debounceTime, map } from 'rxjs/operators';
import { DataTabRemService } from 'app/shared/services/dataTabRem.service';
import { DataTabSiteService } from 'app/shared/services/dataTabSite.service';
import { DataTabQuaiService } from 'app/shared/services/dataTabQuai.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { CrudModalComponent } from './crud-modal/crud-modal.component';
import { FormGroup } from '@angular/forms';
import { SiteService } from './site.service';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['/app/data-tables/data-tables.component.scss', '/assets/sass/libs/datatables.scss'],
  providers: [DataTabSiteService, DecimalPipe],
  
  encapsulation: ViewEncapsulation.None
})
export class BasicComponent implements OnInit {


  public temp: Array<object> = [];
  countries$: Observable<Site[]>;
  total$: Observable<number>;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  @ViewChild('search', { static: false }) search: any;

  


  searchValue: string ;
  
   // public
   public contentHeader: object;
   closeResult: string;
   // row data
   public rows =[];
   IsDataReady:boolean
   public limitRef = 10;
   term: string;
   // column header
   public columns = [
     { name: 'NomRemorque', prop: 'nomRemorque' },
     { name: 'NomSite', prop: 'nomSite' },
     { name: 'DateEAPL', prop: 'dateEAPL' },
     { name: 'Local', prop: 'local' },
     { name: 'NomQuai', prop: 'nomQuai' },
     { name: 'TimeRAPL', prop: 'timeRAPL' },
     { name: 'TimeSPL', prop: 'timeSPL' },
     { name: 'idSite', prop: 'idSite' },
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
 
   ngAfterViewInit(): void {
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.
    fromEvent(this.search.nativeElement, 'keydown')
      .pipe(
        debounceTime(550),
        map(x => x['target']['value'])
      )
      .subscribe(value => {
        this.updateFilter(value);
      });
  }

  updateFilter(val: any) {
     
    console.log("val");
    console.log(val);
   const value = val.toString().toLowerCase().trim();
   // get the amount of columns in the table
   const count = this.columns.length;
   // get the key names of each column in the dataset
   const keys = Object.keys(this.temp[0]);
   // assign filtered matches to the active datatable
   this.rows = this.temp.filter(item => {
     // iterate through each row's column data
     for (let i = 0; i < count; i++) {
       // check for a match
       if (
         (item[keys[i]] &&
           item[keys[i]]
             .toString()
             .toLowerCase()
             .indexOf(value) !== -1) ||
         !value
       ) {
         // found match, return true to add to result set
         return true;
       }
     }
   });
  }


  
 
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
     
   }


    
   
 
   /**
    * filterUpdate
    *
    * @param code
    */
   delete(id:any)
 {
   console.log("id");console.log(id);
   this.DataTabSService.deleteSite(id).subscribe(
     data => { console.log(data) , alert("Element effacé avec succés")  } ,error => { console.log(error), alert("Element deja supprimé ") });
 }
 
 filterUpdate(event) {
     const val = event.target.value.toLowerCase();
 
     // filter our data
     const temp = this.tempData.filter(function (d) {
       return d.NomSite.toLowerCase().indexOf(val) !== -1 || !val;
     });
 
     // update the rows
     this.rows = temp;
     // Whenever the filter changes, always go back to the first page
     this.table.offset = 0;
   }

   /**
   * updateLimit
   *
   * @param limit
   */
  updateLimit(limit) {
    this.limitRef = limit.target.value;
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
    //  this.chkBoxSelected.push(...selected);
   }
 
   /**
    * serverSideSetPage
    *
    * @param event
    */
 /*   serverSideSetPage(event) {
     this.http
       .get('assets/data/datatable-data.json')
       .pipe(map((data) => data as Array<any>))
       .subscribe((data) => {
         this.serverSideRowData = data;
       });
   } */
 
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
 
   
   constructor(public service :SiteService,private DataTabRService: DataTabRemService,private modalService: NgbModal,private DataTabSService: DataTabSiteService,private DataTabQService: DataTabQuaiService) {
     this.IsDataReady = false;
     console.log("this.rows");
     console.log(this.rows);
 
 
   
          this.countries$ = service.countries$;
          this.total$ = service.total$;
   
      }


      onSort({column, direction}: SortEvent) {
        // resetting other headers
        this.headers.forEach(header => {
          if (header.sortable !== column) {
            header.direction = '';
          }
        });
    
        this.service.sortColumn = column;
        this.service.sortDirection = direction;
      }
    
      openmodal() {
       
        const modalRef = this.modalService.open(CrudModalComponent);
        modalRef.componentInstance.id = 0; // should be the id
        modalRef.componentInstance.data = {local: "",
        nomSite :"",
        dateEAPL:"",
        timeRAPL:"",
        timeSPL:"",};
       
      }
    
 
   // Lifecycle Hooks
   // -----------------------------------------------------------------------------------------------------
 
   /**
    * On init
    */
   ngOnInit() {
 
     this.DataTabSService.getSite().subscribe(
       data => { console.log(data) ;
       
         data.forEach(element => {
   
           this.rows.push({ idSite : element['idSite'] ,nomRemorque : element['remorque']["nomRemorque"], nomSite : element["nomSite"] ,local : element["local"], nomQuai : element['qaui']["nomQuai"]  , dateEAPL : element['dateEAPL'] ,timeEAPL :  (new Date (element['timeSPL']).getHours()+":"+(new Date (element['timeSPL']).getMinutes())),timeRAPL : (new Date (element['timeRAPL']).getHours()+":"+(new Date (element['timeRAPL']).getMinutes()))} );}
    
           );
           console.info('this.rows');console.info(this.rows);
           this.IsDataReady = true;
       }, error => { console.log(error) })
 
       this.temp=this.rows;
     // Initially load first page
 
 
     //this.serverSideSetPage({ offset: 0 });
 
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