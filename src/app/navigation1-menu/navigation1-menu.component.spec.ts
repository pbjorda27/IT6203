import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Navigation1MenuComponent } from './navigation1-menu.component';

describe('NavigationMenuComponent', () => {
  let component: Navigation1MenuComponent;
  let fixture: ComponentFixture<Navigation1MenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Navigation1MenuComponent]
    });
    fixture = TestBed.createComponent(Navigation1MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
