
  import { Component, OnInit, ViewEncapsulation, ViewChild, AfterViewInit } from '@angular/core';

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

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'app/shared/services/login.service';
import { fromEvent } from 'rxjs';





@Component({
  selector: "app-users-list",
  templateUrl: "./users-list.component.html",
  styleUrls: [
    "./users-list.component.scss",
    "/assets/sass/libs/datatables.scss",
  ],
  encapsulation: ViewEncapsulation.None
})
export class UsersListComponent implements OnInit,AfterViewInit {
  // public
  public contentHeader: object;
  public temp: Array<object> = [];
  // row data
  public rows =[];
  IsDataReady:boolean
  public usersArray = [] ;
  // //search checked


  @ViewChild('search', { static: false }) search: any;

  
  // column header
  public columns = [
    { name: "ID", prop: "idPersonne" },
    { name: "nomPersonne", prop: "nomPersonne" },
    { name: "prenom", prop: "prenom" },
    { name: "Last Activity", prop: "Last Activity" },
    { name: "adresseMail", prop: "adresseMail" },
    { name: "type", prop: "typeRole" },
   
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
  

  //search checked


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
   // this.rows = [...this.rows];
  }

  /**
   * filterUpdate
   *
   * @param code

   */
//search checked

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

    // Whenever the filter changes, always go back to the first page
    // this.table.offset = 0;
  }

  filterUpdate(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.tempData.filter(function (d) {
      return d.nomPersonne.toLowerCase().indexOf(val) !== -1 || !val;
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
      //.get('assets/data/datatable-data.json')
      //.pipe(map((data) => data as Array<any>))
      //.subscribe((data) => {
       // this.serverSideRowData = data;
      };
  

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

  constructor(private modalService: NgbModal,private DataTabUService: LoginService,private DataTabSService: DataTabSiteService,private DataTabQService: DataTabQuaiService) {
 
    this.DataTabUService.getAll().subscribe(data => {
      // Populating usersArray with names from API
      data.forEach(element => {
        this.usersArray.push(element.nomPersonne);
      });
      console.info('this.usersArray');console.info(this.usersArray);

    });

  }







  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit() {
    
    this.DataTabUService.getAll().subscribe(
      data => { console.log(data) ;
      
        data.forEach(element => {
  
          this.rows.push({ nomPersonne : element['nomPersonne'],idPersonne : element['idPersonne'] ,prenom : element['prenom'] ,adresseMail : element['adresseMail'], type : element['role']['type'],} );}
     
          );

          console.info('this.rows');console.info(this.rows);
          this.IsDataReady = true;
      }, error => { console.log(error) })

     

  //this.filterUpdate("") 
this.temp=this.rows;

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


 