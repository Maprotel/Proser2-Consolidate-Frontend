import { Component, Input } from '@angular/core';

@Component({
  selector: 'hello',
  template: `
  <h1>Hello {{name}}!</h1>
  
  <a [href]="'https://www.google.com/'"
    appExternalUrl
    >Go to google</a>
  `,
  styles: [`h1 { font-family: Lato; }`]
})
export class HelloComponent  {
  name = 'External links';
}
