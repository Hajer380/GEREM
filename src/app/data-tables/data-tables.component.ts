import { Component, OnInit, ViewEncapsulation, ViewChild, ViewChildren, QueryList, Injectable } from '@angular/core';
import { DatatableData } from './data/datatables.data';
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
import { CrudModalComponent } from './crud-modal/crud-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { fromEvent } from 'rxjs';
import Swal from 'sweetalert2';
import { DecimalPipe } from '@angular/common';
import { NgbdSortableHeader } from 'app/tables/basic/sortable.directive';





@Component({
  selector: 'app-datatables',
  templateUrl: './data-tables.component.html',
  styleUrls: ['./data-tables.component.scss', '/assets/sass/libs/datatables.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ DecimalPipe],


})
@Injectable({ providedIn: 'root' })
export class DataTablesComponent implements OnInit {
  // public
  public contentHeader: object;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  @ViewChild('search', { static: false }) search: any;
  public temp: Array<object> = [];

  // row data
  public rows =[];
  IsDataReady:boolean

  // column header
  public columns = [
   
    { name: 'Contenu', prop: 'Contenu' },
  
    { name: 'DateESP', prop: 'DateESP' },
    { name: 'DegUrg', prop: 'DegUrg' },
    { name: 'Destination', prop: 'Destination' },
    { name: 'idRemorque', prop: 'idRemorque' },
    { name: 'IdRemorque', prop: 'idRemorque' },
    { name: 'nomQuai', prop: 'nomQuai' },
    { name: 'NomRemorque', prop: 'NomRemorque' },
    { name: 'NomTransporteur', prop: 'NomTransporteur' },
    { name: 'TimeESP', prop: 'TimeESP' },

    { name: 'Traçabilité', prop: 'Traçabilité' },
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
   // this.rows = [...this.rows];
  }


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

   // Whenever the filter changes, always go back to the first page
   // this.table.offset = 0;
 }













  /**
   * filterUpdate
   *
   * @param code
   */
  delete(id:any)
{
  this.DataTabRService.deleteRemorque(id).subscribe(
    data => { console.log(data) }, error => {  Swal.fire('faites attention !!', 'Cette remorque fait partie du Planning des remorques  vous ne pouvez pas la supprimer. Si vous voulez la supprimer , supprimez la du planning avant !!  ', 'error') });
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

  constructor(private modalService: NgbModal,private DataTabRService: DataTabRemService,private DataTabSService: DataTabSiteService,private DataTabQService: DataTabQuaiService) {
    this.IsDataReady = false;
    console.log("this.rows");
    console.log(this.rows);


    this.DataTabSService.getSite().subscribe(
      data => { console.log(data) }, error => { console.log(error) })

      this.DataTabQService.getQuaiList().subscribe(
        data => { console.log(data) }, error => { console.log(error) })  



    this.DataTabRService.getRemById(2).subscribe(
      data => { console.log(data) }, error => { console.log(error) })

  }

  openmodal() {
       
    const modalRef = this.modalService.open(CrudModalComponent);
    modalRef.componentInstance.id = 0; // should be the id
    modalRef.componentInstance.data = {}
  }





  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit() {

    this.DataTabRService.getRemorqueList().subscribe(
      data => { console.log(data) ;
      
        data.forEach(element => {
  
          this.rows.push({ nomQuai : element['qaui']['nomQuai'],idRemorque : element['idRemorque'] ,contenu : element['contenu'] , dateESP : element['dateESP'],degUrg : element['degUrg'],destination : element['destination'], nomRemorque : element['nomRemorque'],nomTransporteur : element['nomTransporteur'] ,traçabilité : element['traçabilité'] ,timeESP : element['timeESP']} );}
     


          );
          console.info('this.rows');console.info(this.rows);
          this.IsDataReady = true;
      }, error => { console.log(error) })

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
