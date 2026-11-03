
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Videojoc } from "../../models/videojoc.model";
import { TargetaVideojocComponent } from "../targeta-videojoc/targeta-videojoc.component";

@Component({
  selector: "app-llista-videojocs",
  standalone: true,
  imports: [TargetaVideojocComponent],
  templateUrl: "./llista-videojocs.component.html"
})
export class LlistaVideojocsComponent {
  // TODO 1: rep l'array de videojocs
  @Input() videojocs: Videojoc[] = [];

  // TODO 2: reemet el videojoc seleccionat cap al pare
  @Output() seleccionar = new EventEmitter<Videojoc>();
}
