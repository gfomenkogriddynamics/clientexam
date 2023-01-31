import { Component, OnInit } from '@angular/core';
import { EventsFacadeService } from "../../services";
import { BehaviorSubject } from "rxjs";
import { AnimalEvent } from "../../models";
import { TABLE_HEADERS, TABLE_KEYS } from "./table.component.consts";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  constructor(public eventsFacadeService: EventsFacadeService) {
  }

  tableKeys = TABLE_KEYS;
  tableHeaders = TABLE_HEADERS;

  editableCell = new BehaviorSubject<{ eventId: number; key: keyof AnimalEvent } | null>(null)
  editableCell$ = this.editableCell.asObservable();

  isAddingNewRow = new BehaviorSubject(false);
  isAddingNewRow$ = this.isAddingNewRow.asObservable();

  inputValue = '';
  newRowValue: Record<string, string> = {};

  ngOnInit(): void {
    this.eventsFacadeService.getList();
  }

  enterEditMode(event: AnimalEvent, key: keyof AnimalEvent): void {
    if (key === 'eventId') {
      return;
    }

    this.editableCell.next({
      eventId: event.eventId, key,
    })

    this.inputValue = event[key] as string;
  }

  leaveEditMode(e: Event): void {
    e.stopPropagation();

    this.editableCell.next(null)
  }

  saveCell(e: Event, event: AnimalEvent, key: keyof AnimalEvent): void {
    this.eventsFacadeService.editEvent(event.eventId, {
      key,
      value: this.inputValue
    })

    this.leaveEditMode(e);
  }

  deleteRow(id: number): void {
    this.eventsFacadeService.deleteEvent(id);
  }

  enterAddNewRowMode(): void {
    this.isAddingNewRow.next(true);
  }

  leaveAddNewRowMode(): void {
    this.isAddingNewRow.next(false);
    this.newRowValue = {};
  }

  saveRow(): void {
    this.eventsFacadeService.addEvent(this.newRowValue);
    this.leaveAddNewRowMode();
  }
}
