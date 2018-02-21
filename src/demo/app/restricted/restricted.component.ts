import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: '',
  template: `
  
  `,
  styles: [`
  
  `]
})
export class ScrRestrictedDemoComponent {


  constructor(private httpClient: HttpClient) {
    this.httpClient.get('https://api.scienceroots.com/token').toPromise();
  }
}
