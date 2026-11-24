import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormulariFiltresComponent } from './formulari-filtres.component';

describe('FormulariFiltres', () => {
  let component: FormulariFiltresComponent;
  let fixture: ComponentFixture<FormulariFiltresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormulariFiltresComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormulariFiltresComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
