import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GifsService {

  public gifList: Gif[] = [];

  private _tagHistory:  string [] = [];
  private apiKey:       string = 'CKi9fqnEt4uaDReQKF5t5kp62B04z9mL';
  private serviceUrl:   string = 'https://api.giphy.com/v1/gifs';

  constructor( private htpp: HttpClient) {
    this.loadLocalStorage();
  }


  get tagHistory(){
    return [...this._tagHistory]
  }


  private organizeHistory(tag: string){
    //TODO: lo pasamos a minuscula
    tag = tag.toLocaleLowerCase();
    //TODO: con este método borro el tag anterior
    if ( this._tagHistory.includes( tag ) ) {
      this._tagHistory = this._tagHistory.filter( (oldTag) =>oldTag !== tag)}
    //TODO: con este método inserto el tag al principio del arreglo
    this._tagHistory.unshift( tag );
    this._tagHistory = this.tagHistory.splice(0,10);
    this.saveLocalStorage();
  }


  private saveLocalStorage():void{
    localStorage.setItem('history', JSON.stringify(this._tagHistory));
  }

  private loadLocalStorage():void{
    if( !localStorage.getItem('history') ) return;

    this._tagHistory = JSON.parse( localStorage.getItem('history')! );
    if( this._tagHistory.length === 0) return;
    this.searchTag( this._tagHistory[0] );
  }



  searchTag( tag: string ): void{
    if ( tag.length === 0) return;
    this.organizeHistory( tag );

    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit', '10')
    .set('q', tag )

    this.htpp.get<SearchResponse>(`${ this.serviceUrl }/search?`,{ params })
    .subscribe( resp => {

      this.gifList = resp.data;

    })


  }


}
