import { Component, OnInit } from '@angular/core';
import { RosterService } from './roster.service';

@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.scss'],
  standalone: true,
})
export class RosterComponent implements OnInit {
  roster: any[] = [];

  constructor(private rosterService: RosterService) {}

  ngOnInit(): void {
    this.rosterService.getRoster().subscribe((data) => {
      this.roster = data;
    });
  }
}
ngOnInit(): void {
  this.rosterService.getRoster().subscribe((data) => {
    this.roster = data.length ? data : [
      { username: 'johndoe', email: 'johndoe@example.com' },
      { username: 'janedoe', email: 'janedoe@example.com' },
    ];
  });
}
currentPage = 1;
itemsPerPage = 5;

get paginatedRoster() {
  const start = (this.currentPage - 1) * this.itemsPerPage;
  return this.roster.slice(start, start + this.itemsPerPage);
}

changePage(page: number) {
  this.currentPage = page;
}
