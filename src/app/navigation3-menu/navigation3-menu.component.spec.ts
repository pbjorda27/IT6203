import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Navigation3MenuComponent } from './navigation3-menu.component';

describe('Navigation3MenuComponent', () => {
  let component: Navigation3MenuComponent;
  let fixture: ComponentFixture<Navigation3MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Navigation3MenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Navigation3MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
