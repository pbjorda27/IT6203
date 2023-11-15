// list-skill.component.ts

import { Component, OnInit } from '@angular/core';
import { SkillService } from '../skill.servive'; // Import your SkillService or adjust the path accordingly

interface Skill {
  _id: string;
  name: string;
  proficiency: string;
}

@Component({
  selector: 'app-list-skill',
  templateUrl: './list-skill.component.html',
  styleUrls: ['./list-skill.component.css']
})
export class ListSkillComponent implements OnInit {
  skills: Skill[] = []; // Initialize an empty array for skills

  constructor(private skillService: SkillService) { }

  ngOnInit() {
    this.getSkills(); // Fetch skills when the component is initialized
  }

  async getSkills() {
    try {
      const skills = await this.skillService.getSkills().toPromise();
      console.log('Skills:', skills);
    } 
    catch (error) {
      console.error('Error fetching skills:', error);
    }
  }

  onDelete(skillId: string) {
    // Implement the logic to delete a skill (e.g., call a service method)
  }
}
