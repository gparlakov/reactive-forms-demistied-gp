import { Component } from '@angular/core';
import { FormControl, Validators, AbstractControl } from '@angular/forms';
import { tap, debounceTime, map, startWith } from 'rxjs/operators';

const maxChars = 280;
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = new FormControl(
    localStorage.getItem('value'),
    Validators.maxLength(maxChars));

  tweet = this.name;

  changes$ = this.tweet.valueChanges
    .pipe(
      debounceTime(300),
      tap(v => localStorage.setItem('value', v)))

  private tweetLength$ = this.tweet.valueChanges.pipe(
    startWith(this.tweet.value),
    map(v => maxChars - v.length),
  );

  lengthRemaining$ = this.tweetLength$.pipe(
    map(v => v < 0 ? `${v * -1} chars too many ` : v === 0 ? 'Perfect' : v),
    startWith(maxChars));

  isOverLenght$ = this.tweetLength$.pipe(map(l => l > maxChars))

  highlightInvalid(c: AbstractControl) {
    return !c.pristine && !c.valid ? 'red' : undefined;
  }

  validate() {

  }
}


