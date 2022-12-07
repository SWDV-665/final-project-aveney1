import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrackerService {
  
  items: any = [];

  dataChanged$: Observable<boolean>;

  private dataChangeSubject: Subject<boolean>;

  baseURL = "http://localhost:8080";

  constructor(public http: HttpClient) {
    console.log('Hello TrackerService Provider');

    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangeSubject.asObservable();
   }

  getItems(): Observable<object[]>{
      let obs: Observable<object[]> = this.http.get<object[]>(this.baseURL + '/api/jobapptracker').pipe(
        map((dbItems: object[]) => this.items = dbItems),
        catchError(this.handleError)
      );
      return obs;
  }

    handleError(error: Response | any){
      let errMsg: string;
  
      if(error instanceof Response){
        const err = error || '';
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      }else{
        errMsg = error.message ? error.message : error.toString();
      }
  
      console.error(errMsg);
      return throwError(errMsg);
    }

  removeItem(id){
    console.log("### Remove Item - id: ", id);
    this.http.delete(this.baseURL + '/api/jobapptracker/' + id).subscribe(res => {
      this.items = res;
    });
    this.dataChangeSubject.next(true);
    this.dataChangeSubject.next(true);

  }

  addItem(item){
    console.log("### Add Item: ", item);
    this.http.post(this.baseURL + '/api/jobapptracker/', item).subscribe(res => {
      this.items = res;
    });
    this.dataChangeSubject.next(true);
    this.dataChangeSubject.next(true);

  }

  editItem(item, index){
    console.log("### Edit Item = ", item);
    this.http.put<any[]>(this.baseURL + '/api/jobapptracker/' + item._id, item).subscribe(res => {
      this.items = res;
    });
    this.dataChangeSubject.next(true);
    this.dataChangeSubject.next(true);
  }

}