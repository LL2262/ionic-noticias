import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaTopHeadLines } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  private apiKey = environment.apiKey;
  private apiUrl = environment.apiUrl;
  private page = 0;

  private categoriaActual = '';
  private categoriaPage = 0;

  constructor(private _http: HttpClient) { }

  getTopHeadLines(){
    this.page ++;
    return this._http.get<RespuestaTopHeadLines>(this.apiUrl+'&apiKey='+this.apiKey+'&page='+this.page);
  }

  getTopHeadLinesCategory(categoria: string){

    if(this.categoriaActual === categoria){
      this.categoriaPage ++;
    }else{
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
    }

    return this._http.get<RespuestaTopHeadLines>(this.apiUrl+'&category='+categoria+'&apiKey='+this.apiKey);
  }
}
