import { Component, signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { CategoriaVideojoc, Videojoc } from "./models/videojoc.model";
import { VIDEOJOCS } from "./services/videojocs.mocks";
import { LlistaVideojocsComponent } from "./components/llista-videojocs/llista-videojocs.component";
import { FormulariFiltresComponent } from "./components/formulari-filtres/formulari-filtres.component";


@Component({
  imports: [RouterOutlet, LlistaVideojocsComponent,FormulariFiltresComponent],
  selector: "app-root",
  styleUrl: "./app.component.scss",
  templateUrl: "./app.component.html",
})
export class App {
  public nomAplicacio = "Biblioteca de videojocs";

  //dades que el pare passa a la llista
  videojocs: Videojoc[] = VIDEOJOCS;

  //videojocs restants despres dels filtres
  videojocsVisibles = [...VIDEOJOCS];

  videojocSeleccionat: Videojoc | null = null;

  aplicaFiltres(filtres: {
  text: string;
  categoria: CategoriaVideojoc | "";
}): void {
  const text = filtres.text.trim().toLocaleLowerCase();

  this.videojocsVisibles = VIDEOJOCS.filter(videojoc =>
    videojoc.titol.toLocaleLowerCase().includes(text) &&
    (!filtres.categoria || videojoc.categoria === filtres.categoria)
  );

  
  if (this.videojocSeleccionat && !this.videojocsVisibles.some(videojoc =>
    videojoc.id === this.videojocSeleccionat!.id)) {
    this.videojocSeleccionat = null;
  }
}
}
