import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-reports-call-entry-stats',
  templateUrl: './call-entry-stats.component.html',
  styleUrls: ['./call-entry-stats.component.scss']
})
export class CallEntryStatsComponent implements OnInit {

  @Input() stats;
  @Input() show_stats;

  constructor() { }

  ngOnInit() {
  }

}
