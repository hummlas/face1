import {Component, OnInit} from '@angular/core';
import {Person, nullPerson} from '../person.model';
import {PeopleService} from '../people.service';

@Component({
  selector: 'f1-guess-name',
  templateUrl: './guess-name.component.html',
  styleUrls: ['./guess-name.component.css'],
  providers: [PeopleService]
})
export class GuessNameComponent implements OnInit {
  people: Person[];
  personToGuess = nullPerson;
  correctGuesses: number = 0;
  allCorrectlyGuessed: boolean = false;

  constructor(private peopleService: PeopleService) {
  }

  getPeople() {
    this.peopleService.getPeople()
      .then(people => {
        this.people = people;
      })
      .then(() => {
        this.personToGuess = this.people[0];
      });
  }

  guessName(guess) {
    const isCorrectGuess = guess.trim().toLocaleLowerCase() === this.personToGuess.name.toLocaleLowerCase();

    if (isCorrectGuess) {
      if (++this.correctGuesses < this.people.length) {
        this.personToGuess = this.people[this.correctGuesses];
      } else {
        this.allCorrectlyGuessed = true;
      }

    } else {
      console.log('Doh!');
    }
  }

  ngOnInit(): void {
    this.getPeople();
  }

}

