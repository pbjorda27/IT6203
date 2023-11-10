import { Component, OnInit, Input } from '@angular/core';
import { InspirationService } from '../inspiration.service';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-add-inspiration',
  templateUrl: './add-inspiration.component.html',
  styleUrls: ['./add-inspiration.component.css']
})
export class AddInspirationComponent implements OnInit {

  @Input() inspiration: string = "";
  @Input() keyword1: string = "";
  @Input() keyword2: string = "";
  @Input() keyword3: string = "";

  public mode = 'Add'; //default mode
  private id: any; //inspriation ID
  private inspiration1: any;

  constructor(private _myService: InspirationService, private router: Router, public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('_id')) {
        this.mode = 'Edit'; /*request had a parameter _id */
        this.id = paramMap.get('_id');

        //request inspiration info based on the id
        this._myService.getInspiration1(this.id).subscribe(
          data => {
            //read data and assign to private variable inspiration
            this.inspiration1 = data;
            //populate the firstName and lastName on the page
            //notice that this is done through the two-way bindings
            this.inspiration = this.inspiration1.inspiration;
            this.keyword1 = this.inspiration1.keyword1;
            this.keyword2 = this.inspiration1.keyword2;
            this.keyword3 = this.inspiration1.keyword3;
          },
          err => console.error(err),
          () => console.log('finished loading')
        );
      }
      else {
        this.mode = 'Add';
        this.id = null;
      }
    });
  }

  onSubmit() {
    console.log("You submitted: " + this.inspiration + " " + this.keyword1 + " " + this.keyword2 + " " + this.keyword3);
    if (this.mode == 'Add')
      this._myService.addInspiration(this.inspiration, this.keyword1, this.keyword2, this.keyword3);
    if (this.mode == 'Edit')
      this._myService.updateInspiration(this.id, this.inspiration, this.keyword1, this.keyword2, this.keyword3);
    this.router.navigate(['listInspiration']);
  }

  transformToUpperCase(value: string): string {
    return value.toUpperCase();
  }

  onCancel() {
    // Navigate back to the searchInspiration page
    this.router.navigate(['/searchInspiration']); // Adjust the route as needed
  }

}
