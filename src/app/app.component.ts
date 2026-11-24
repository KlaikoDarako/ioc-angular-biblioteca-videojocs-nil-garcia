
import { Component, inject, signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { CategoriaVideojoc, Videojoc } from "./models/videojoc.model";
import { VIDEOJOCS } from "./services/videojocs.mocks";
import { VideojocsService } from "./services/videojocs.service"; 
import { LlistaVideojocsComponent } from "./components/llista-videojocs/llista-videojocs.component";
import { FormulariFiltresComponent } from "./components/formulari-filtres/formulari-filtres.component";

//EAC3
import { FormulariNouVideojocComponent } from "./components/formulari-nou-videojoc/formulari-nou-videojoc.component";

@Component({
  imports: [RouterOutlet, LlistaVideojocsComponent,FormulariFiltresComponent, FormulariNouVideojocComponent],
  selector: "app-root",
  styleUrl: "./app.component.scss",
  templateUrl: "./app.component.html",
})
export class App {
  public nomAplicacio = "Biblioteca de videojocs";

  //dades que el pare passa a la llista
  //videojocs: Videojoc[] = VIDEOJOCS;                    //Modificat a EAC3
  private videojocsService = inject(VideojocsService);

  //videojocs restants despres dels filtres
  //videojocsVisibles = [...VIDEOJOCS];                    //Modificat a EAC3
  get videojocsVisibles(): Videojoc[] {
    return this.videojocsService.estat().videojocs;
  }


  videojocSeleccionat: Videojoc | null = null;


constructor(){
  this.videojocsService.carregarTot();
}
  
  aplicaFiltres(filtres: {
  text: string;
  categoria: CategoriaVideojoc | "";
}): void {
  const text = filtres.text.trim().toLocaleLowerCase();

  /*
  this.videojocsVisibles = VIDEOJOCS.filter(videojoc =>
    videojoc.titol.toLocaleLowerCase().includes(text) &&
    (!filtres.categoria || videojoc.categoria === filtres.categoria)
  );
  */
  this.videojocsService.cercar({text: filtres.text,categoria: filtres.categoria});
  
  if (this.videojocSeleccionat && !this.videojocsVisibles.some(videojoc =>
    videojoc.id === this.videojocSeleccionat!.id)) {
    this.videojocSeleccionat = null;
  }
}
}
