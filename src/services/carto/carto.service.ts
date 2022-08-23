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

  /**
   * This function launches a query on Carto3.
   *
   * @param {String} token - JWT Carto3 Token 
   * @param {String} query - Query to be executed
   * @param {CartoMethod} method - HTTP method to be used
   * @param {CartoQueryPayload} payload - HTTP POST payload
   * @param {CartoQueryOptions} options - HTTP GET options
   *
   * @returns {Promise<any>} Promise with the response or rejects with an error message if the request fails.
   *
   * @example
   * ```ts
   * return await this.cartoService.query(
   *  req.headers.authorization,
   *  "select 1",
   *  <CartoMethod>{ type: "get" }
   * );
   * ```
   *
   * @alpha
   */
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
        ...payload
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

  /**
   * This function launches a job on Carto3.
   *
   * @param {String} token - JWT Carto3 Token 
   * @param {CartoMethod} method - HTTP method to be used
   * @param {String} query - Query to be executed
   * @param {CartoJobPayload} payload - HTTP POST payload
   * @param {String} id - ID to be requested
   * @param {CartoJobOptions} options - HTTP GET options
   *
   * @returns {Promise<any>} Promise with the response or rejects with an error message if the request fails.
   *
   * @example
   * ```ts
   * return await this.cartoService.job(
   *  req.headers.authorization,
   *  <CartoMethod>{ type: "post" },
   *  "select 1"
   * );
   * ```
   *
   * @alpha
   */
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

  /**
   * This function retrieves a job list fron Carto3.
   *
   * @param {String} token - JWT Carto3 Token 
   * @param {CartoJobListOptions} options - HTTP GET options
   *
   * @returns {Promise<any>} Promise with the response or rejects with an error message if the request fails.
   *
   * @example
   * ```ts
   * return await this.cartoService.jobs(
   *  req.headers.authorization,
   * );
   * ```
   *
   * @alpha
   */
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
