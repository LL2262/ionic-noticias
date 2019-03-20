import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaTopHeadLines } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor(private _http: HttpClient) { }

  getTopHeadLines(){
    return this._http.get<RespuestaTopHeadLines>(`https://newsapi.org/v2/top-headlines?country=ar&apiKey=e53216bba9e547aaa21e98a8fa26ca2a`);
  }
}
