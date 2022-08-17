import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs'
import { CartoMethod, CartoQueryPayload, CartoQueryOptions, CartoJobPayload, CartoJobOptions } from './carto.interface';

@Injectable()
export class CartoService {
  constructor(private readonly httpService: HttpService) {}

  query(query: string, method: CartoMethod, payload?: CartoQueryPayload, options?: CartoQueryOptions): Observable<AxiosResponse<any>> {
    return this.httpService.get('http://localhost:3000/api/v1');
  }

  job(query: string, method: CartoMethod, payload?: CartoJobPayload, id?: string, options?: CartoJobOptions): Observable<AxiosResponse<any>> {
    return this.httpService.get('http://localhost:3000/api/v1');
  }

  jobs(): Observable<AxiosResponse<any>> {
    return this.httpService.get('http://localhost:3000/api/v1');
  }
}
