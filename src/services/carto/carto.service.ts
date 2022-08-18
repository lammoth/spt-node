import { Observable, lastValueFrom } from 'rxjs'
import { map, tap } from 'rxjs/operators';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { CartoMethod, CartoQueryPayload, CartoQueryOptions, CartoJobPayload, CartoJobOptions } from './carto.interface';

@Injectable()
export class CartoService {
  constructor(private readonly httpService: HttpService) {}

  query(query: string, method: CartoMethod, payload?: CartoQueryPayload, options?: CartoQueryOptions): Observable<AxiosResponse<any>> {
    return this.httpService.get('http://localhost:3000/api/v1').pipe(
      tap((axiosResponse: AxiosResponse) => console.log(axiosResponse)),
      map(
        (axiosResponse: AxiosResponse) => {
          return axiosResponse.data;
        }
      ),
      tap((data) =>  console.log(data))
    );
  }

  job(query: string, method: CartoMethod, payload?: CartoJobPayload, id?: string, options?: CartoJobOptions): Observable<AxiosResponse<any>> {
    return this.httpService.get('http://localhost:3000/api/v1');
  }

  async jobs(): Promise<any> {
    const res = this.httpService.get('http://localhost:3000/api/v1/info').pipe(
      map(
        (axiosResponse: AxiosResponse) => {
          return axiosResponse.data;
        }
      )
    );

    return await lastValueFrom(res);
  }
}
