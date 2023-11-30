import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSkillFormComponent } from './add-skill-form.component';

describe('AddSkillFormComponent', () => {
  let component: AddSkillFormComponent;
  let fixture: ComponentFixture<AddSkillFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddSkillFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddSkillFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
