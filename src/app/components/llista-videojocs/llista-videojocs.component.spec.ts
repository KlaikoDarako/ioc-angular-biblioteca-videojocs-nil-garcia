import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LlistaVideojocsComponent } from './llista-videojocs.component';

describe('LlistaVideojocs', () => {
  let component: LlistaVideojocsComponent;
  let fixture: ComponentFixture<LlistaVideojocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LlistaVideojocsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LlistaVideojocsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
