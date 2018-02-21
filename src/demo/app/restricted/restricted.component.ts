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
    this.httpClient.get('http://localhost:8080/token').toPromise();
  }
}
