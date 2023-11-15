// add-skill.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SkillService } from '../skill.servive'; // Import your SkillService or adjust the path accordingly
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-skill',
  templateUrl: './add-skill.component.html',
  styleUrls: ['./add-skill.component.css']
})
export class AddSkillComponent implements OnInit {
  skillForm!: FormGroup;

  constructor(private fb: FormBuilder, private _myService: SkillService) { }

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    this.skillForm = this.fb.group({
      name: ['', Validators.required],
      proficiency: ['Beginner', Validators.required]
    });
  }
  
onSubmit() {
  if (this.skillForm.valid) {
    const newSkill = this.skillForm.value;
    console.log('Skill to be added:', newSkill);
    this._myService.createSkill(newSkill).subscribe(
      (response: any) => {
        console.log('Skill added successfully:', response);
        this.skillForm.reset();
      },
      (error: any) => {
        console.error('Error adding skill:', error);

        if (error instanceof HttpErrorResponse){
          console.error('Status:' ,error.status)
          console.error('Body:' , error.error);
      }
    }
    );
  }
}
}
