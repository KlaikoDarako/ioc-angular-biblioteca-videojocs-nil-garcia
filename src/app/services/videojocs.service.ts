import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Service, inject, signal } from '@angular/core';
import { Observable, Subject, catchError, map, of, switchMap, tap } from 'rxjs';

//aqui reutilitzo el codi proporcionat directament a 5.2. Implementar servei amb signals, switchMap i HttpClient
//modifico els noms, canvi element per videojoc etc...

import { adaptarVideojocApi, adaptarVideojocsApi, prepararVideojocApi } from '../adaptadors/videojoc.adaptador';
import { VideojocApiResponse, Videojoc, EstatVideojocs, NouVideojoc } from '../models/videojoc.model';
import { environment } from '../../environments/environment';

export interface CriterisCerca {
  text: string;
  categoria: string;   // '' = totes les categories
}

@Service()
export class VideojocsService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/elements`;

  // Flux de criteris: cada cerca nova s'emet aquí.
  // Subject (no BehaviorSubject): no volem cap emissió inicial automàtica;
  // la primera petició la dispara el component amb carregarTot()
  private readonly criterisInicials: CriterisCerca = { text: '', categoria: '' };
  private readonly criteris$ = new Subject<CriterisCerca>();
  private darrersCriteris = this.criterisInicials;

  // Estat únic del servei, exposat com a signal de només lectura
  private readonly estatSignal = signal<EstatVideojocs>({ estat: 'inicial', videojocs: [] });
  readonly estat = this.estatSignal.asReadonly();

  constructor() {
    this.criteris$.pipe(
      tap((criteris) => {
        this.darrersCriteris = criteris;
        this.estatSignal.set({ estat: 'carregant', videojocs: [] });
      }),
      // switchMap cancel·la la petició anterior si arriben criteris nous abans que acabi
      switchMap((criteris) => this.obtenirVideojocs(criteris).pipe(
        map((videojocs): EstatVideojocs => ({ estat: 'exit', videojocs })),
        catchError((error: HttpErrorResponse) => of<EstatVideojocs>({
          estat: 'error',
          videojocs: [],
          error: this.gestionarError(error),
        }))
      ))
    ).subscribe((estat) => this.estatSignal.set(estat));
  }

  /** Carrega tots els elements (sense criteris) */
  carregarTot(): void {
    this.cercar(this.criterisInicials);
  }

  /** Emet criteris nous: el flux del constructor fa la petició */
  cercar(criteris: CriterisCerca): void {
    this.criteris$.next({
      text: criteris.text.trim(),
      categoria: criteris.categoria,
    });
  }

  /** Repeteix l'última cerca (botó "Reintentar") */
  reintentar(): void {
    this.criteris$.next(this.darrersCriteris);
  }

  /** Crea un element nou amb POST i, si va bé, refresca el llistat */
  crearVideojoc(nou: NouVideojoc): Observable<Videojoc> {
    return this.http.post<VideojocApiResponse>(this.apiUrl, prepararVideojocApi(nou)).pipe(
      map(adaptarVideojocApi),
      tap(() => this.reintentar())
    );
  }

  /** Nombre de resultats per a un terme (per al validador asíncron) */
  comptarResultats(terme: string): Observable<number> {
    return this.obtenirVideojocs({ text: terme, categoria: '' }).pipe(       //revisar ja que tenim nomenclatura "element", corregit a la funcio de sota
      map((videojocs) => videojocs.length)
    );
  }

  private obtenirVideojocs(criteris: CriterisCerca): Observable<Videojoc[]> {
    let params = new HttpParams();
    if (criteris.categoria) {
      params = params.set('categoria', criteris.categoria);
    }

    return this.http.get<VideojocApiResponse[]>(this.apiUrl, { params }).pipe(
      map(adaptarVideojocsApi),
      map((videojocs) => this.filtrarPerTerme(videojocs, criteris.text))
    );
  }

  private filtrarPerTerme(videojocs: Videojoc[], terme: string): Videojoc[] {
    const text = terme.trim().toLocaleLowerCase('ca');
    if (text.length < 3) {
      return videojocs;
    }
    return videojocs.filter((videojoc) =>
      `${videojoc.titol} ${videojoc.descripcio}`.toLocaleLowerCase('ca').includes(text)
    );
  }

  private gestionarError(error: HttpErrorResponse): string {
    switch (error.status) {
      case 0:
        return 'No es pot connectar amb l\'API. Comproveu que npm run api està actiu.';
      case 404:
        return 'Recurs no trobat. Verifiqueu la URL de l\'API.';
      case 500:
        return 'Error intern del servidor.';
      default:
        return `Error inesperat (${error.status}): ${error.message}`;
    }
  }
}