import { Component, OnInit } from '@angular/core';
import { InspirationService } from '../inspiration.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-inspiration',
  templateUrl: './add-inspiration.component.html',
  styleUrls: ['./add-inspiration.component.css']
})
export class AddInspirationComponent implements OnInit {

  myForm: FormGroup;

  inspiration1: any;
  public mode = 'Add';
  private id: any;

  constructor(
    private _myService: InspirationService,
    private router: Router,
    public route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.myForm = this.fb.group({
      Inspiration: ['', [Validators.required]],
      keyword1: ['', [Validators.required]],
      keyword2: ['', [Validators.required]],
      keyword3: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('_id')) {
        this.mode = 'Edit';
        this.id = paramMap.get('_id');

        this._myService.getInspiration1(this.id).subscribe(
          data => {
            this.inspiration1 = data;
            this.myForm.patchValue({
              Inspiration: this.inspiration1.inspiration,
              keyword1: this.inspiration1.keyword1,
              keyword2: this.inspiration1.keyword2,
              keyword3: this.inspiration1.keyword3,
            });
          },
          err => console.error(err),
          () => console.log('finished loading')
        );
      } else {
        this.mode = 'Add';
        this.id = null;
      }
    });
  }

  onSubmit() {
    console.log('Form Status:', this.myForm.status);
    console.log('Form Controls:', this.myForm.controls);

    if (this.myForm.valid) {
      console.log("You submitted: " + this.myForm.value.Inspiration + " "
                                    + this.myForm.value.keyword1 + " "
                                    + this.myForm.value.keyword2 + " "
                                    + this.myForm.value.keyword3);

      if (this.mode === 'Add') {
        this._myService.addInspiration(
          this.myForm.value.Inspiration,
          this.myForm.value.keyword1,
          this.myForm.value.keyword2,
          this.myForm.value.keyword3
        );
      } else if (this.mode === 'Edit') {
        this._myService.updateInspiration(
          this.id,
          this.myForm.value.Inspiration,
          this.myForm.value.keyword1,
          this.myForm.value.keyword2,
          this.myForm.value.keyword3
        );
      }

      this.router.navigate(['listInspiration']);
    }
  }

  onCancel() {
    this.router.navigate(['/searchInspiration']);
  }
}