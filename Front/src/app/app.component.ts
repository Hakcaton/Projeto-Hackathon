import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'NeoDocs';

  constructor(private accountService: AccountService) { }
}
