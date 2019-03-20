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
    this._noticiasServices.getTopHeadLines().subscribe(res => {
      this.noticias.push( ...res.articles)
    });
  }
    
}
