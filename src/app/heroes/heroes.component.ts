import {Component, OnInit} from '@angular/core';
import {Hero} from '../model/hero';
import {HeroService} from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];

  constructor(private heroService: HeroService) {
  }

  ngOnInit() {
    this.getHeroes();
  }

  addHero(name: string) {
    name = name.trim();
    if(!name) return;
    this.heroService.addHero({name} as Hero).subscribe(hero => this.heroes.push(hero));
  }

  deleteHero(hero: Hero) {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(
      value => this.heroes = value,
      error => console.log(error),
      () => console.log('heroes successfully arrived!'));
  }

}
