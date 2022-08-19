import { lastValueFrom } from 'rxjs'
import { map } from 'rxjs/operators';
import { Injectable } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { CartoMethod, CartoQueryPayload, CartoQueryOptions, CartoJobPayload, CartoJobOptions, CartoJobListOptions } from './carto.interface';
import { sqlFormat } from 'src/common/utils/sql'

@Injectable()
export class CartoService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {}

  async query(token: string, query: string, method: CartoMethod, payload?: CartoQueryPayload, options?: CartoQueryOptions): Promise<any> {
    let requestConfig = {
      baseURL: this.configService.get<string>('carto.baseUrl'),
      url: `${this.configService.get<string>('carto.sqlUrl')}/${this.configService.get<string>('carto.connection')}/query`,
      method: method.type,
      headers: {
        "Authorization": token 
      }
    };

    if (method.type === "get") {
      requestConfig['params'] = {
        q: sqlFormat(query),
        ...options
      };
    } else if (method.type === "post") {
      requestConfig['data'] = {
        q: sqlFormat(query),
        ...options
      };
    }
    
    const res = this.httpService.request(requestConfig).pipe(
      map(
        (axiosResponse: AxiosResponse) => {
          return axiosResponse.data;
        }
      )
    );

    return await lastValueFrom(res);
  }

  async job(token: string, method: CartoMethod, query?: string, payload?: CartoJobPayload, id?: string, options?: CartoJobOptions): Promise<any> {
    let requestConfig = {
      baseURL: this.configService.get<string>('carto.baseUrl'),
      url: `${this.configService.get<string>('carto.sqlUrl')}/${this.configService.get<string>('carto.connection')}/job`,
      method: method.type,
      headers: {
        "Authorization": token 
      }
    };

    if (id) {
      const urlWithId = `${requestConfig.url}/${id}`
      requestConfig['url'] = urlWithId
    }

    if (method.type === "post") {
      requestConfig['params'] = {
        ...options
      };
      requestConfig['data'] = {
        query: sqlFormat(query),
        ...payload
      };
    } else {
      requestConfig['params'] = {
        ...options
      };
    }

    const res = this.httpService.request(requestConfig).pipe(
      map(
        (axiosResponse: AxiosResponse) => {
          return axiosResponse.data;
        }
      )
    );

    return await lastValueFrom(res);
  }

  async jobs(token: string, options?: CartoJobListOptions): Promise<any> {
    const requestConfig = {
      baseURL: this.configService.get<string>('carto.baseUrl'),
      url: `${this.configService.get<string>('carto.sqlUrl')}/jobs`,
      method: "get",
      params: { ...options },
      headers: {
        "Authorization": token 
      }
    };
    const res = this.httpService.request(requestConfig).pipe(
      map(
        (axiosResponse: AxiosResponse) => {
          return axiosResponse.data;
        }
      )
    );

    return await lastValueFrom(res);
  }
}
