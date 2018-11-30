import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class AppService {

  constructor(private http: Http) { }

  public reqUrl(url: string, params: any = {}, responseType: ResponseType = ResponseType.text): Observable<any> {
    return this._reqUrl(url, params, responseType);
  }

  private _reqUrl(url: string, params: any, responseType: ResponseType = ResponseType.text): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Headers': 'Content-Type','Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET' });
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

  requestPHP(url: string): Observable<any> {
    return this.http.post(url, {});
  }

}

export enum ResponseType {
  json,
  text,
  arrayBuffer
}
