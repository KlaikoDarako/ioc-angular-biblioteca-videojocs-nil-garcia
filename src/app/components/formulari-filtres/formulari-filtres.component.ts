import { Component, EventEmitter, Output } from "@angular/core";
import { CategoriaVideojoc } from "../../models/videojoc.model";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-formulari-filtres",
  standalone: true,
  imports: [FormsModule],
  templateUrl: "./formulari-filtres.component.html"
})
export class FormulariFiltresComponent {
  text = "";
  categoria: CategoriaVideojoc | "" = "";

  categories: CategoriaVideojoc[] = [
    "Acció",
    "Aventura",
    "Esports",
    "Estratègia",
    "Rol",
    "Simulació"
  ];


  @Output() aplicarFiltres = new EventEmitter<{
    text: string;
    categoria: CategoriaVideojoc | "";
  }>();

   aplica(): void {
    this.aplicarFiltres.emit({
      text: this.text,
      categoria: this.categoria
    });
  }

  restableix(): void {
    this.text = "";
    this.categoria = "";

    this.aplicarFiltres.emit({
      text: "",
      categoria: ""
    });
  }
}