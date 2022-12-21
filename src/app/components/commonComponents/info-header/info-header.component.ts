import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info-header',
  templateUrl: './info-header.component.html',
  styleUrls: ['./info-header.component.scss'],
})
export class InfoHeaderComponent implements OnInit {
  @Input() backTo = '';

  constructor(private router: Router) {}

  ngOnInit() {}

  back = () => {
    this.router.navigate([this.backTo]);
  };
}
