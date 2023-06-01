import { Component, Input } from '@angular/core';
import { Gif } from 'src/app/gifs/interfaces/gifs.interfaces';
import { GifsService } from 'src/app/gifs/services/gifs.service';
@Component({
  selector: 'gifs-card-list',
  templateUrl: './card-list.component.html',
})
export class CardListComponent {

  constructor(private gifsService: GifsService){

  }

  @Input()
  public gifs: Gif[] = [];

  get gifsCard(): Gif[] {
    return this.gifsService.gifList;
  }
}
