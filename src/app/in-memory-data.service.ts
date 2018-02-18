import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Hero} from './model/hero';

@Injectable()
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const heroes: Hero[] = [
      {id: 10, name: '最強の兵士'},
      {id: 11, name: 'Mr. Nice'},
      {id: 12, name: 'Bombista'},
      {id: 13, name: 'Hype Machine'},
      {id: 14, name: 'Troubleshooter'},
      {id: 15, name: 'Dr IQ'},
      {id: 16, name: 'John Batman'},
      {id: 17, name: 'Jimmy McMuffin'},
      {id: 18, name: 'Golden boy'},
      {id: 19, name: 'Mike Jackpot'},
      {id: 20, name: 'Victor DeFlux'}
    ];
    return {heroes};
  }
}
