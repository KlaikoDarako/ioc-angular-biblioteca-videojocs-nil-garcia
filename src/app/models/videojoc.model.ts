
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

export interface VideojocApiResponse {
  id: string;
  titol: string;
  descripcio: string;
  categoria: CategoriaVideojoc;
  dataLlancament: string;
  puntuacio: number;
  destacat?: boolean;
}

export type EstatServei = 'inicial' | 'carregant' | 'exit' | 'error';

export interface EstatVideojocs {
  estat: EstatServei;
  videojocs: Videojoc[];
  error?: string;
}

//omitim el id, tractat a un altre punt
export type NouVideojoc = Omit<Videojoc, 'id'>;