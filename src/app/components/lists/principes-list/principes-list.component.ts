import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-principes-list',
  templateUrl: './principes-list.component.html',
  styleUrls: ['./principes-list.component.css']
})
export class PrincipesListComponent implements OnInit {

  @Input() principeCollection$: Observable<any[]>;

  @Output() selectEvent: EventEmitter<any> = new EventEmitter;

  constructor() { }

  ngOnInit() {
  }

  select(item) {
    this.selectEvent.emit(item);
  }

}
