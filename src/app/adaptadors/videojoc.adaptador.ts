
import { Videojoc, VideojocApiResponse, CategoriaVideojoc, NouVideojoc } from '../models/videojoc.model';

const CATEGORIES_NORMALITZADES: Record<string, CategoriaVideojoc> = {
  'acció': 'Acció',
  'aventura': 'Aventura',
  'esports': 'Esports',
  'estratègia': 'Estratègia',
  'rol': 'Rol',
  'simulació': 'Simulació',
};

function normalitzaCategoria(categoria: string | undefined): CategoriaVideojoc {
  const neta = (categoria ?? '').trim();
  return CATEGORIES_NORMALITZADES[neta.toLocaleLowerCase()] ?? 'Aventura'; //si no trova res tornem una existent, ja que no tinc una buida
  //donava error sino al fer el build
}

function numeroSegur(valor: unknown, perDefecte = 0): number {
  const n = Number(valor);
  return Number.isFinite(n) ? n : perDefecte;
}


export function adaptarVideojocApi(apiVideojoc: VideojocApiResponse): Videojoc {
  return {
    id: numeroSegur(apiVideojoc.id),
    titol: (apiVideojoc.titol ?? '').trim(),
    descripcio: (apiVideojoc.descripcio ?? '').trim(),
    categoria: normalitzaCategoria(apiVideojoc.categoria),
    dataLlancament: apiVideojoc.dataLlancament,
    puntuacio: numeroSegur(apiVideojoc.puntuacio),
    destacat: apiVideojoc.destacat ?? false,
  };
}


export function adaptarVideojocsApi(apiVideojocs: VideojocApiResponse[]): Videojoc[] {
  return apiVideojocs.map(adaptarVideojocApi);
}


export function videojocBuit(): Videojoc {
  return {
    id: 0,
    titol: '',
    descripcio: '',
    categoria: 'Aventura',
    dataLlancament: '',
    puntuacio: 0,
    destacat: false,
  };
}

//videojoc per a enviar a la API
export function prepararVideojocApi(
  nou: NouVideojoc
): Omit<VideojocApiResponse, 'id'> {
  return {
    titol: nou.titol.trim(),
    descripcio: nou.descripcio.trim(),
    categoria: nou.categoria,
    dataLlancament: nou.dataLlancament,
    puntuacio: Number(nou.puntuacio),
    destacat: nou.destacat ?? false,
  };
}
