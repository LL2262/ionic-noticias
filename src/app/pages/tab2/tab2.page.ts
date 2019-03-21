import { Component, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Article } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  categorias = [{name: 'Negocios', value: 'business'}, 
                {name: 'Entretenimiento', value: 'entertainment'},
                {name: 'General', value: 'general'}, 
                {name: 'Salud', value: 'health'}, 
                {name: 'Ciencia', value: 'science'}, 
                {name: 'Deportes', value: 'sports'}, 
                {name: 'Tecnología', value: 'technology'}];

  noticias: Article[] = [];

  constructor(private _noticiasService: NoticiasService){}

  ngOnInit(){
    this.cargarNoticias(this.categorias[0].value);
  }

  categoryChange(event){
    this.noticias = [];
    this.cargarNoticias(event.detail.value);
  }

  cargarNoticias(categoria: string){
    this._noticiasService.getTopHeadLinesCategory(categoria).subscribe(res => {
      this.noticias.push( ...res.articles);
    });
  }

}
