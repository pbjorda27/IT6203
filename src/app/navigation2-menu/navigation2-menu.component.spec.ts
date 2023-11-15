import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Navigation2MenuComponent } from './navigation2-menu.component';

describe('NavigationMenuComponent', () => {
  let component: Navigation2MenuComponent;
  let fixture: ComponentFixture<Navigation2MenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Navigation2MenuComponent]
    });
    fixture = TestBed.createComponent(Navigation2MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
