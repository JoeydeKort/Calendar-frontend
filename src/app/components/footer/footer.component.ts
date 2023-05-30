import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  title: string = '\u00A9 2023 My Website. All rights reserved.';

  constructor() {}

  ngOnInit(): void {}
}
