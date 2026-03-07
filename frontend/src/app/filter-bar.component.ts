import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent {
  live = false;
  optionSearch = '';
  searchText = '';
  selectedOption: string | null = null;
  isDropdownOpen = false;
  options = [
    'List Option 1',
    'List Option 2',
    'List Option 3',
    'List Option 4',
    'List Option 5',
    'List Option 6',
    'List Option 7'
  ];
  filteredOptions = [...this.options];

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
    this.isDropdownOpen = false;
    this.optionSearch = '';
    this.filteredOptions = [...this.options];
  }

  clearSearch() {
    this.searchText = '';
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
