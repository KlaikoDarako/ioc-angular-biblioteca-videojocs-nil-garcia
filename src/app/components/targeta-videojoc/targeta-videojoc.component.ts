
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Videojoc } from "../../models/videojoc.model";
import { EtiquetaCategoriaComponent } from "../etiqueta-categoria/etiqueta-categoria.component";

@Component({
  selector: "app-targeta-videojoc",
  standalone: true,
  imports: [EtiquetaCategoriaComponent],
  templateUrl: "./targeta-videojoc.component.html"
})
export class TargetaVideojocComponent {
  // TODO 1: rep un Videojoc obligatori
  @Input({required: true}) videojoc!: Videojoc;

  // TODO 2: crea una sortida que emeti un Videojoc
  @Output() seleccionar = new EventEmitter<Videojoc>();
}
