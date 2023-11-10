import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddInspirationComponent } from './add-inspiration.component';


describe('AddInpirationComponent', () => {
  let component: AddInspirationComponent;
  let fixture: ComponentFixture<AddInspirationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddInspirationComponent]
    });
    fixture = TestBed.createComponent(AddInspirationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
