import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TargetaVideojocComponent } from './targeta-videojoc.component';
import { Videojoc } from '../../models/videojoc.model';

describe('TargetaVideojoc', () => {
  let component: TargetaVideojocComponent;
  let fixture: ComponentFixture<TargetaVideojocComponent>;

  //em falla en test 
  const videojocProva: Videojoc = {
  id: 1,
  titol: 'Videojoc de prova',
  descripcio: 'Descripció de prova',
  categoria: 'Acció',
  dataLlancament: '2026-01-15',
  puntuacio: 8.5,
  destacat: true,
};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TargetaVideojocComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TargetaVideojocComponent);
    component = fixture.componentInstance;
    component.videojoc = videojocProva;

    //forcem revisio
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
