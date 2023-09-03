import {Injectable, PipeTransform} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import {Site} from './site';

import {DecimalPipe} from '@angular/common';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import {SortDirection} from './sortable.directive';
import { DataTabSiteService } from 'app/shared/services/dataTabSite.service';

interface SearchResult {

  sites: Site[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: string;
  sortDirection: SortDirection;
}


function compare(v1, v2) {
  return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

function sort(sites: Site[], column: string, direction: string): Site[] {
  if (direction === '') {
    return sites;
  }  else {
    return sites.sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  } 
}

function matches(site: Site, term: string, pipe: PipeTransform) {
  return (site.nomQuai||'').toLowerCase().includes(term)
    || (site.local||'').toLowerCase().includes(term)
    
    ||(site.nomSite||'').toLowerCase().includes(term)
}

@Injectable({providedIn: 'root'})
export class SiteService {

  
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _countries$ = new BehaviorSubject<Site[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private pipe: DecimalPipe , private DataService : DataTabSiteService ) {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._countries$.next(result.sites);
      this._total$.next(result.total);
    });


this._search$.next();

    }
  dataList=[];
 
    

  get countries$() { return this._countries$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: string) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    // 1. sort
   let  sites = sort(this.dataList, sortColumn, sortDirection);

        
    this.DataService.getSite().subscribe(
      data => { console.log(data) ;
      
        data.forEach(element => {
  
          this.dataList.push(element);}
   
          );
          console.info('this.dataList');console.info(this.dataList);
        
      }, error => { console.log("this.dataList");console.log(error) })

    // 2. filter
    console.log('countries'),console.log(this.dataList)
    this.dataList = this.dataList.filter(site => matches(site, searchTerm, this.pipe));
    const total = this.dataList.length;
    console.log('searchTerm'),console.log(this.searchTerm)
    

    // 3. paginate
   // sites = sites.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({sites, total});
  }
}
