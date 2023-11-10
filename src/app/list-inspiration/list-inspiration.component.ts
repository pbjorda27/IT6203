import { Component } from '@angular/core';
import { InspirationService } from '../inspiration.service';

@Component({
  selector: 'app-list-inspiration',
  templateUrl: './list-inspiration.component.html',
  styleUrls: ['./list-inspiration.component.css']
})
export class ListInspirationComponent {

  searchText: string = '';
  public inspiration: any;

  constructor(private _myService: InspirationService) { }
  ngOnInit(): void {
      this.getInspiration();
  }

  getInspiration() {
    this._myService.getInspiration().subscribe(
      data => {this.inspiration = data},
      err => console.error(err),
      () => console.log('finished loading')
    );
}

  onDelete(inspirationId: string) {
    this._myService.deleteInspiration(inspirationId);
  }

}
