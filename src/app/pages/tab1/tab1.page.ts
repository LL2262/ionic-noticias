import { Component } from '@angular/core';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Article } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  noticias: Article[] = [];

  constructor(private _noticiasServices: NoticiasService){}

  ngOnInit(){
    this.cargarNoticias();
  }

  loadNoticias(event){
    this.cargarNoticias(event);
  }

  cargarNoticias(event?){
    this._noticiasServices.getTopHeadLines().subscribe(res => {

      if(res.articles.length == 0){
        event.target.disabled = true;
        event.target.complete();
        return;
      }

      this.noticias.push( ...res.articles);

      if(event ){
        event.target.complete();
      }
    });
  }
    
}
