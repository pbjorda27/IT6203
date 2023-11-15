import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { SkillService } from './skill.servive';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

interface Skill{
  _id: string;
  name: string;
  proficiency: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'personal-website';
  skills: Skill[] = [];
  skillForm!: FormGroup;
  addedSkills: string[] = [];
  private url = 'mongodb://localhost:27017';
  private dbName = 'personal-skillsite';

  programmingLanguages: string[] = ['HTML', 'CSS', 'JavaScript', 'Angular', 'Node', 'Python', 'SQL'];
  machineLearningTools: string[] = ['scikit-learn', 'TensorFlow', 'Keras'];
  dataVisualizationTools: string[] = ['Tableau', 'Power BI'];
  cloudPlatforms: string[] = ['AWS', 'Azure'];
  softSkills: string[] = ['Problem Solving', 'Communication', 'Team Work'];
  proficiencyLevels: string[] = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

  constructor(private _myService: SkillService, private router: Router) { }

  ngOnInit() {
    this.skillForm = new FormGroup({
        'programmingLanguage': new FormControl(null),
        'programmingLanguageProficiency': new FormControl(null),
        'machineLearning': new FormControl(null),
        'machineLearningProficiency': new FormControl(null),
        'dataVisualization': new FormControl(null),
        'dataVisualizationProficiency': new FormControl(null),
        'cloudPlatform': new FormControl(null),
        'cloudPlatformProficiency': new FormControl(null),
        
    });
  }
  async getSkills() {
    try {
      const skills = await this._myService.getSkills().toPromise();
      console.log('Skills:', skills);
      // handle the skills as needed
    } catch (error) {
      console.error('Error fetching skills:', error);
    }
  }

  onSubmit() {
    let skillOutput = '';
    if (this.skillForm.value.programmingLanguage) {
        skillOutput += this.skillForm.value.programmingLanguage + ' (' + this.skillForm.value.programmingLanguageProficiency + '), ';
    }
    if (this.skillForm.value.machineLearning) {
        skillOutput += this.skillForm.value.machineLearning + ' (' + this.skillForm.value.machineLearningProficiency + '), ';
    }
    if (this.skillForm.value.dataVisualization) {
        skillOutput += this.skillForm.value.dataVisualization + ' (' + this.skillForm.value.dataVisualizationProficiency + '), ';
    }
    if (this.skillForm.value.cloudPlatform) {
        skillOutput += this.skillForm.value.cloudPlatform + ' (' + this.skillForm.value.cloudPlatformProficiency + '), ';
    }

    
    // Remove trailing comma and space, then add to the addedSkills array
    this.addedSkills.push(skillOutput.slice(0, -2));
    
    // Optionally, reset the form after submission
    this.skillForm.reset();
  }
  onDelete(skillId: string) {
    // Implement your delete logic here
    // Call the service method to delete the skill
    // After deletion, update the skills array
  }

}
