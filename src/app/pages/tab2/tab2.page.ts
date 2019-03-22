import { Component, ViewChild } from '@angular/core';
import { IonSegment, IonInfiniteScroll } from '@ionic/angular';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Article } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  @ViewChild(IonSegment) segment: IonSegment;
  @ViewChild(IonInfiniteScroll) infinite: IonInfiniteScroll;

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
    this.segment.value = this.categorias[0].value;
    this.cargarNoticias(this.categorias[0].value);
  }

  categoryChange(event){
    this.infinite.disabled = false;
    this.noticias = [];
    this.cargarNoticias(event.detail.value);
  }

  loadNoticias(event){
    this.cargarNoticias(this.segment.value, event);
  }

  cargarNoticias(categoria: string, event?){
    this._noticiasService.getTopHeadLinesCategory(categoria).subscribe(res => {
      this.noticias.push( ...res.articles);

      if(this.noticias.length == res.totalResults){
        event.target.disabled = true;
        event.target.complete();
        return;
      }

      if(event){
        event.target.complete();
      }
    });
  }

}
