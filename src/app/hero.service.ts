import {Injectable} from '@angular/core';
import {Hero} from './model/hero';
import {Observable} from 'rxjs/Observable';
import {MessageService} from './message.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application-json'})
};

@Injectable()
export class HeroService {

  private heroesUrl = 'api/heroes';

  constructor(private messageService: MessageService,
              private httpClient: HttpClient) {
  }

  getHeroes(): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(this.heroesUrl).pipe(
      tap(heroes => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.httpClient.get<Hero>(url).pipe(
      tap(_ => this.log(`fetch hero: id = ${id}`)),
      catchError(this.handleError<Hero>(`get hero id = ${id}`))
    );
  }

  deleteHero(hero: Hero | number): Observable<any> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.httpClient.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('delete hero'))
    );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.httpClient.post(this.heroesUrl, hero, httpOptions).pipe(
      tap((hero: Hero) => this.log(`added hero id=${hero.id}`)),
      catchError(this.handleError<Hero>('addHero hero'))
    );
  }

  updateHero(hero: Hero): Observable<any> {
    return this.httpClient.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('update hero'))
    );
  }

  searchHeroes(name: string): Observable<Hero[]> {
    if(!name.trim()) {
      return of([]);
    }

    return this.httpClient.get<Hero[]>(`api/heroes/?name=${name}`).pipe(
      tap(_ => this.log(`found heroes matching ${name}`)),
      catchError(this.handleError<Hero[]>('search heroes', []))
    )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }
}
