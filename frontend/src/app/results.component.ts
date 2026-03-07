import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterService } from './filter.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit, OnDestroy {
  results: any[] = [];
  loading = false;
  error = '';
  private subscriptions: Subscription = new Subscription();

  constructor(private filterService: FilterService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    // Subscribe to filter changes
    this.subscriptions.add(
      this.filterService.live$.subscribe(() => this.fetchResults())
    );
    this.subscriptions.add(
      this.filterService.searchText$.subscribe(() => this.fetchResults())
    );
    this.subscriptions.add(
      this.filterService.selectedOption$.subscribe(() => this.fetchResults())
    );

    // Initial fetch
    this.fetchResults();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  fetchResults() {
    this.loading = true;
    this.error = '';

    // Get current filter values
    let live: boolean = false;
    let searchText: string = '';
    let selectedOption: string | null = null;

    this.filterService.live$.subscribe(val => live = val).unsubscribe();
    this.filterService.searchText$.subscribe(val => searchText = val).unsubscribe();
    this.filterService.selectedOption$.subscribe(val => selectedOption = val).unsubscribe();

    // Build API URL based on filters
    let url = 'http://localhost:3000/events';
    if (selectedOption) {
      // Assuming selectedOption corresponds to sport or category
      url += `?sport=${encodeURIComponent(selectedOption)}`;
    }
    if (searchText) {
      url += `${url.includes('?') ? '&' : '?'}search=${encodeURIComponent(searchText)}`;
    }
    if (live) {
      url += `${url.includes('?') ? '&' : '?'}live=true`;
    }

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        this.results = Array.isArray(data) ? data : [data];
        this.loading = false;
        this.cdr.detectChanges();
      })
      .catch(error => {
        this.error = 'Failed to fetch results: ' + error.message;
        this.loading = false;
        this.cdr.detectChanges();
      });
  }
}