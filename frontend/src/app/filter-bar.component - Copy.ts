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
  focusedIndex = -1;

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
    this.focusedIndex = this.filteredOptions.length > 0 ? 0 : -1;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
    if (this.isDropdownOpen) {
      this.focusedIndex = this.filteredOptions.findIndex(option => option === this.selectedOption);
      if (this.focusedIndex === -1) {
        this.focusedIndex = 0;
      }
    } else {
      this.focusedIndex = -1;
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

  onSelectKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggleDropdown();
    } else if (event.key === 'ArrowDown' && !this.isDropdownOpen) {
      event.preventDefault();
      this.toggleDropdown();
    } else if (event.key === 'Escape') {
      this.isDropdownOpen = false;
      this.focusedIndex = -1;
      this.optionSearch = '';
      this.filteredOptions = [...this.options];
    }
  }

  onOptionKeydown(event: KeyboardEvent, option: string, index: number) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.selectOption(option);
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.focusedIndex = (index + 1) % this.filteredOptions.length;
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.focusedIndex = index === 0 ? this.filteredOptions.length - 1 : index - 1;
    } else if (event.key === 'Escape') {
      this.isDropdownOpen = false;
      this.focusedIndex = -1;
      this.optionSearch = '';
      this.filteredOptions = [...this.options];
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.custom-select')) {
      this.isDropdownOpen = false;
      this.focusedIndex = -1;
      this.optionSearch = '';
      this.filteredOptions = [...this.options];
    }
  }
}
