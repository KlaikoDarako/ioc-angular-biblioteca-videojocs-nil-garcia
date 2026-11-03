
export type CategoriaVideojoc =
  | "Acció"
  | "Aventura"
  | "Esports"
  | "Estratègia"
  | "Rol"
  | "Simulació";

export interface Videojoc {
  id: number;
  titol: string;
  descripcio: string;
  categoria: CategoriaVideojoc;
  dataLlancament: string;
  puntuacio: number;
  destacat?: boolean;
}
