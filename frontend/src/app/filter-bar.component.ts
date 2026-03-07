import { Component, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FilterService } from './filter.service';

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements OnInit {
  live = false;
  optionSearch = '';
  searchText = '';
  selectedOption: string | null = null;
  isDropdownOpen = false;
  options: string[] = [];
  filteredOptions = [...this.options];

  constructor(private filterService: FilterService) {
    // Sync with service
    this.filterService.live$.subscribe(value => this.live = value);
    this.filterService.searchText$.subscribe(value => this.searchText = value);
    this.filterService.selectedOption$.subscribe(value => this.selectedOption = value);
  }

  ngOnInit() {
    this.fetchSports();
  }

  fetchSports() {
    fetch('http://localhost:3000/sports')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          this.options = data; // Data is already an array of sport names
        } else {
          this.options = []; // Fallback
        }
        this.filteredOptions = [...this.options];
      })
      .catch(() => {
        this.options = []; // Fallback
        this.filteredOptions = [...this.options];
      });
  }

  filterOptions() {
    const search = this.optionSearch.toLowerCase();
    this.filteredOptions = this.options.filter(option => option.toLowerCase().includes(search));
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
    if (!this.isDropdownOpen) {
      this.optionSearch = '';
      this.filteredOptions = [...this.options];
    }
  }

  selectOption(option: string) {
    this.selectedOption = option;
    this.filterService.setSelectedOption(option);
    this.isDropdownOpen = false;
    this.optionSearch = '';
    this.filteredOptions = [...this.options];
  }

  clearSearch() {
    this.searchText = '';
    this.filterService.setSearchText('');
  }

  onLiveChange() {
    this.filterService.setLive(this.live);
  }

  onSearchTextChange() {
    this.filterService.setSearchText(this.searchText);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.custom-select')) {
      this.isDropdownOpen = false;
      this.optionSearch = '';
      this.filteredOptions = [...this.options];
    }
  }
}
