
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoriaVideojoc } from '../../models/videojoc.model';


import { VideojocsService } from '../../services/videojocs.service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-formulari-nou-videojoc',
  styleUrl: './formulari-nou-videojoc.component.scss',
  templateUrl: './formulari-nou-videojoc.component.html',
})
export class FormulariNouVideojocComponent {

  
  private readonly videojocsService = inject(VideojocsService);

  readonly categories = ['Acció', 'Aventura', 'Esports', 'Estratègia', 'Rol', 'Simulació'];

 
  readonly formulari = new FormGroup({
    titol: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] }),
    descripcio: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(10)] }),
    categoria: new FormControl<CategoriaVideojoc>('Aventura', { nonNullable: true, validators: [Validators.required] }),//adaptat per a que poguesim usar el this.formulari.getRawValue()
    dataLlancament: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    puntuacio: new FormControl(0, { nonNullable: true, validators: [Validators.required, Validators.min(0), Validators.max(10)] }),
    destacat: new FormControl(false, { nonNullable: true }),
  });

  // Estat de l'enviament (canvia dins d'una resposta HTTP: per això és un signal)
  readonly enviant = signal(false);
  readonly missatge = signal<string | null>(null);
  readonly error = signal<string | null>(null);

  crear(): void {
    if (this.formulari.invalid) {
      this.formulari.markAllAsTouched();
      return;
    }

    this.enviant.set(true);
    this.missatge.set(null);
    this.error.set(null);

    this.videojocsService.crearVideojoc(this.formulari.getRawValue()).subscribe({
      next: (videojoc) => {
        this.missatge.set(`S'ha creat "${videojoc.titol}" amb l'identificador ${videojoc.id}.`);
        this.formulari.reset({
          titol: '',
          descripcio: '',
          categoria: 'Aventura',
          dataLlancament: '',
          puntuacio: 0,
          destacat: false,
        });
        this.enviant.set(false);
      },
      error: (err: Error) => {
        this.error.set(err.message ?? 'No s\'ha pogut crear el videojoc.');
        this.enviant.set(false);
      },
    });
  }
  
  teError(control: 'titol' | 'descripcio' | 'puntuacio' | 'dataLlancament'): boolean {
    const c = this.formulari.controls[control];
    return c.invalid && (c.dirty || c.touched);
  }
}
