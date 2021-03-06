import { Injectable }     from '@angular/core';
import {Http, Response, URLSearchParams, Headers} from '@angular/http';
import { TimeTable }           from '../models/timetable';
import { Observable }     from 'rxjs/Observable';
import {user} from "../session";

@Injectable()
export class TimeTableService {
  private baseUrl = 'http://46.101.106.208:3000';  // URL to web API
  public headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
  constructor (private http: Http) {
    if(user.token) {
      this.headers.append('Authorization', user.token);
    }
  }

  list(): Observable<TimeTable[]> {
    let params = new URLSearchParams();
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');

    return this.http.get(this.baseUrl+'/timetables', params)
      .map(TimeTableService.extractData)
      .catch(TimeTableService.handleError);
  }

  get(id: number): Observable<TimeTable> {
    let params = new URLSearchParams();
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');

    return this.http.get(this.baseUrl+'/timetables/'+id, params)
      .map(TimeTableService.extractData)
      .catch(TimeTableService.handleError);
  }

  create(model: TimeTable): any {
    const url = this.baseUrl+'/timetables';

    return this.http
      .post(url, JSON.stringify(model), {headers: this.headers})
      .toPromise()
      .catch(TimeTableService.handleError);
  }

  remove(id: number): any {
    const url = this.baseUrl+'/timetables/'+id;

    return this.http
      .delete(url, {headers: this.headers})
      .toPromise()
      .catch(TimeTableService.handleError);
  }

  update(model: TimeTable): any {
    const url = this.baseUrl+'/timetables/'+model.id;

    return this.http
      .put(url, JSON.stringify(model), {headers: this.headers})
      .toPromise()
      .then(() => model)
      .catch(TimeTableService.handleError);
  }

  private static extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private static handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
