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
    let options = new RequestOptions({ headers: headers });

    let paramsToSend = this.softCopyJSON(params);
    let domainName = this.getDomainName(url);
    if (domainName.toLowerCase() == window.location.host.toLowerCase())
      paramsToSend['CSRF_TOKEN'] = this.getCookie('CSRF_TOKEN');

    let response = this.http.post(url, paramsToSend, options);

    if (responseType == ResponseType.json)
      return response.pipe(map((res: Response) => res.json()));
    else if (responseType == ResponseType.arrayBuffer)
      return response.pipe(map((res: Response) => res.arrayBuffer()));
    else
      return response.pipe(map((res: Response) => res.text()));
  }

  softCopyJSON(data: any): object {
    let cloned: object = {};
    for (let key in data)
      cloned[key] = data[key];

    return cloned;
  }

  getDomainName(url: string): string {
    let domainNameStartIndex = url.indexOf('//');
    let domainName = '';

    if (domainNameStartIndex >= 0)
      domainName = url.substring(domainNameStartIndex + 2);
    else
      domainName = url;

    let domainNameEndIndex = domainName.indexOf('/');

    if (domainNameEndIndex >= 0)
      domainName = domainName.substring(0, domainNameEndIndex);

    return domainName;
  }
  
  getCookie(name): string {
    let value = '; ' + document.cookie;
    let parts = value.split('; ' + name + '=');
    if (parts.length == 2) return parts.pop().split(';').shift();
  }
  
}

export enum ResponseType {
  json,
  text,
  arrayBuffer
}