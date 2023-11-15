// src/app/skill.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Skill } from './skill.model';

@Injectable({
  providedIn: 'root',
})
export class SkillService {
  private url = 'http://localhost:3000/api/skills'; // Replace with your server URL

  constructor(private http: HttpClient) {}

  createSkill(skillData: any): Observable<any> {
    return this.http.post<any>(`${this.url}/create-skill`, skillData);
  }


  submitSkills(skills: any): Observable<any> {
    return this.http.post(this.url, skills);
  }

  getSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(`${this.url}/projects`);
  }
}

