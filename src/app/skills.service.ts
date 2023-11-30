import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//we know that response will be in JSON format
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class SkillsService {

    constructor(private http:HttpClient) {}

    // Uses http.get() to load data 
    getSkills() {
        return this.http.get('http://localhost:8000/skills');
    }

//Uses http.post() to post data 
addSkills(skill: string, level: string) {
    this.http.post('http://localhost:8000/skills',{ skill, level })
        .subscribe((responseData) => {
            console.log(responseData);
        }); 
    }

 deleteSkill(skillId: string) {
    this.http.delete("http://localhost:8000/skills/" + skillId)
        .subscribe(() => {
            console.log('Deleted: ' + skillId);
        });
        location.reload()
    }

    updateSkill(skillId: string,skill: string, level: string) {
        //request path http://localhost:8000/skill/5xbd456xx 
        //skill and level will be sent as HTTP body parameters 
        this.http.put("http://localhost:8000/skills/" + 
        skillId,{ skill, level })
        .subscribe(() => {
            console.log('Updated: ' + skillId);
        });
    }

    //Uses http.get() to request data based on student id 
getSkill(skillId: string) {
    return this.http.get('http://localhost:8000/skills/'+ skillId);
}

}