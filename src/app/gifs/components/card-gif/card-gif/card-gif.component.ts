import { Component, Input, OnInit } from '@angular/core';
import { Gif } from 'src/app/gifs/interfaces/gifs.interfaces';
@Component({
  selector: 'gifs-card',
  templateUrl: './card-gif.component.html',
})
export class CardGifComponent implements OnInit {


  @Input()
  public gif!: Gif;

  ngOnInit(): void {
   if(!this.gif ) throw new Error('Gifs property is required');
  }

}
