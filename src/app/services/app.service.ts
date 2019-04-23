import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, Jsonp, URLSearchParams } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Injectable()
export class AppService {
  times = 0;
  constructor(private http: Http,
    private jsonp: Jsonp,
    private httpClient: HttpClient) { }

  public reqUrl(url: string, params: any = {}, responseType: ResponseType = ResponseType.text): Observable<any> {
    return this._reqUrl(url, params, responseType);
  }

  private _reqUrl(url: string, params: any, responseType: ResponseType = ResponseType.text): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET' });
    const options = new RequestOptions({ headers: headers });

    const paramsToSend = this.softCopyJSON(params);
    const domainName = this.getDomainName(url);
    if (domainName.toLowerCase() === window.location.host.toLowerCase()) {
      paramsToSend['CSRF_TOKEN'] = this.getCookie('CSRF_TOKEN');
    }

    const response = this.http.post(url, paramsToSend, options);

    if (responseType === ResponseType.json) {
      return response.pipe(map((res: Response) => res.json()));
    } else if (responseType === ResponseType.arrayBuffer) {
      return response.pipe(map((res: Response) => res.arrayBuffer()));
    } else {
      return response.pipe(map((res: Response) => res.text()));
    }
  }

  softCopyJSON(data: any): object {
    const cloned: object = {};
    for (const key in data) {
      cloned[key] = data[key];
    }
    return cloned;
  }

  getDomainName(url: string): string {
    const domainNameStartIndex = url.indexOf('//');
    let domainName = '';

    if (domainNameStartIndex >= 0) {
      domainName = url.substring(domainNameStartIndex + 2);
    } else {
      domainName = url;
    }

    const domainNameEndIndex = domainName.indexOf('/');

    if (domainNameEndIndex >= 0) {
      domainName = domainName.substring(0, domainNameEndIndex);
    }

    return domainName;
  }

  getCookie(name): string {
    const value = '; ' + document.cookie;
    const parts = value.split('; ' + name + '=');
    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }
  }

  requestPHP(url: string, method: string, params: string): Observable<any> {
    const requestOptions = new RequestOptions();
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST' });
    requestOptions.headers = headers;

    url = url + "?METHOD=" + method + "&" + params;

    return this.http.get(url, requestOptions);
  }

  uploadImage(formData: FormData): Observable<any> {
    const url = 'http://localhost/busads/assets/back-end/uploadImage.php';

    const requestOptions = new RequestOptions();
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST' });
    requestOptions.headers = headers;

    return this.http.post(url, formData);
  }

  uploadText(formData: FormData): Observable<any> {
    const url = 'http://localhost/busads/assets/back-end/uploadText.php';

    const requestOptions = new RequestOptions();
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST' });
    requestOptions.headers = headers;

    return this.http.post(url, formData);
  }

  requestJsonp(url): Observable<any> {
    // options.params is an HttpParams object
    return this.jsonp.request(url);
  }

  requestJsonp2(url) {
    const params = new URLSearchParams();
    // params.set('search', term); // the user search value
    params.set('action', 'opensearch');
    params.set('format', 'json');
    params.set('callback', 'BANKTEST');
    this.times = this.times + 1;
    // TODO: Add error handling
    return this.jsonp.get(url, { search: params });
  }



}

export enum ResponseType {
  json,
  text,
  arrayBuffer
}
