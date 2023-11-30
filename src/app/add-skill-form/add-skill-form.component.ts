import { Component, OnInit, Input } from '@angular/core';
import { SkillsService } from '../skills.service';
import {Router} from '@angular/router';
import {ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-add-skill-form',
  templateUrl: './add-skill-form.component.html',
  styleUrls: ['./add-skill-form.component.css'],
})
export class AddSkillFormComponent {
@Input() skill: string = "";
@Input() level: string = "";

public mode = 'Add'; //default mode
private id: any; //skill ID
private skills: any;

constructor(private _myService: SkillsService, private router:Router, public route: ActivatedRoute) { }

ngOnInit() {
  this.route.paramMap.subscribe((paramMap: ParamMap ) => {
    if (paramMap.has('_id')){
        this.mode = 'Edit'; /*request had a parameter _id */ 
        this.id = paramMap.get('_id');

         //request skill info based on the id
        this._myService.getSkill(this.id).subscribe(
            data => { 
                //read data and assign to private variable student
                this.skills = data;
                //populate the firstName and lastName on the page
                //notice that this is done through the two-way bindings
                this.skill = this.skills.skill;
                this.level = this.skills.level;
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
onSubmit(){
  console.log("You submitted: " + this.skill + " " + this.level);
  if (this.mode == 'Add')
    this._myService.addSkills(this.skill ,this.level);
if (this.mode == 'Edit')
    this._myService.updateSkill(this.id,this.skill ,this.level);
  this.router.navigate(['/listskills']);
}
}
