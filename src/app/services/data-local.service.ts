import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias: Article[] = [];

  constructor(private _storage: Storage, private toastCrtl: ToastController) { 
    this.cargarFavoritos();
   }

  guardarNoticia(noticia: Article){
    const exist = this.noticias.find( noti => noti.title == noticia.title );
    if(!exist){
      noticia.favorito = true;
      this.noticias.unshift( noticia );
      this._storage.set('favoritos', this.noticias);
      this.presentToast('Agregado a favoritos!');
    }
  }

  async cargarFavoritos(){
    const favoritos = await this._storage.get('favoritos');
    if(favoritos){
      this.noticias = favoritos;
    }
    
  }

  borrarNoticia(noticia: Article){
    this.noticias = this.noticias.filter( noti => noti.title != noticia.title);
    this._storage.set('favoritos', this.noticias);
    this.presentToast('Borrado de favoritos!');
  }

  async presentToast(mesagge: string) {
    const toast = await this.toastCrtl.create({
      message: mesagge,
      duration: 1500,
    });
    toast.present();
  }

}
