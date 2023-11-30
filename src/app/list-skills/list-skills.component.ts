import { Component } from '@angular/core';
import { SkillsService } from '../skills.service';

@Component({
  selector: 'app-list-skills',
  templateUrl: './list-skills.component.html',
  styleUrls: ['./list-skills.component.css'],
})
export class ListSkillsComponent {
  public skills: any;
  constructor(private _myService: SkillsService)   { }
 ngOnInit() {
     this.getSkills();
 }
 //method called OnInit
 getSkills() {
     this._myService.getSkills().subscribe(
         //read data and assign to public variable students
         data => { this.skills = data},
         err => console.error(err),
         () => console.log('finished loading')
     );
 }  
  onDelete(skillId: string) {
    this._myService.deleteSkill(skillId);
}

}
