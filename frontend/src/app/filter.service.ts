import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private liveSubject = new BehaviorSubject<boolean>(false);
  private searchTextSubject = new BehaviorSubject<string>('');
  private selectedOptionSubject = new BehaviorSubject<string | null>(null);

  live$ = this.liveSubject.asObservable();
  searchText$ = this.searchTextSubject.asObservable();
  selectedOption$ = this.selectedOptionSubject.asObservable();

  setLive(value: boolean) {
    this.liveSubject.next(value);
  }

  setSearchText(value: string) {
    this.searchTextSubject.next(value);
  }

  setSelectedOption(value: string | null) {
    this.selectedOptionSubject.next(value);
  }
}