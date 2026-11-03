
import { Component, Input } from "@angular/core";
import { CategoriaVideojoc } from "../../models/videojoc.model";

@Component({
  selector: "app-etiqueta-categoria",
  standalone: true,
  template: "<span class='tag'>{{ categoria }}</span>"
})
export class EtiquetaCategoriaComponent {
  // Rep la categoria del component pare
  @Input() categoria!: CategoriaVideojoc;
}
