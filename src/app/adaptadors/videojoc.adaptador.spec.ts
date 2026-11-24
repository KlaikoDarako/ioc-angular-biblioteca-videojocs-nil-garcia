
import { adaptarVideojocApi, adaptarVideojocsApi } from './videojoc.adaptador';
//import { VideojocApiResponse } from '../models/videojoc.model';
import { VideojocApiResponse, CategoriaVideojoc } from '../models/videojoc.model';

describe('adaptarVideojocApi', () => {
  const apiVideojoc: VideojocApiResponse = {
    id: 'test-001',
    titol: '  Videojoc de prova  ',
    descripcio: 'Descripció de prova',
    categoria: 'Acció',
    dataLlancament: '2026-01-15',
    puntuacio: 8.5,
    destacat: true,
  };

  it('netejar espais amb trim()', () => {
    expect(adaptarVideojocApi(apiVideojoc).titol).toBe('Videojoc de prova');
  });

  /*
   it('normalitza la categoria', () => {
    const adaptat = adaptarVideojocApi(apiVideojoc);
    expect(adaptat.categoria).toBe('Acció');
  });
  */
  
  it('normalitza la categoria', () => {
  const adaptat = adaptarVideojocApi({
    ...apiVideojoc,
    categoria: '  acció  ' as CategoriaVideojoc,
  });

  expect(adaptat.categoria).toBe('Acció');
  });
  

  it('converteix puntuacions no vàlides a 0', () => {
    const adaptat = adaptarVideojocApi({...apiVideojoc,puntuacio: 'abc' as unknown as number,});
  expect(adaptat.puntuacio).toBe(0);
  });

 it('adapta un array complet', () => {
    expect(adaptarVideojocsApi([apiVideojoc, { ...apiVideojoc, id: 'test-002' }])).toHaveLength(2);
  });
});