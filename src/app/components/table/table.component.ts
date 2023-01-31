import { Component, OnInit } from '@angular/core';
import { EventsFacadeService } from "../../services";
import { BehaviorSubject } from "rxjs";
import { AnimalEvent } from "../../models";

const TABLE_KEYS = [
  'eventId',
  'ageInDays',
  'alertType',
  'animalId',
  'birthDateCalculated',
  'breedingNumber',
  'calvingEase',
  'cowEntryStatus',
  'cowId',
  'currentGroupId',
  'currentGroupName',
  'daysInLactation',
  'daysInPregnancy',
  'deletable',
  'destinationGroup',
  'destinationGroupName',
  'duration',
  'endDate',
  'endDateTime',
  'healthIndex',
  'heatIndexPeak',
  'interval',
  'isOutOfBreedingWindow',
  'lactationNumber',
  'minValueDateTime',
  'newGroupId',
  'newGroupName',
  'newborns',
  'oldLactationNumber',
  'originalStartDateTime',
  'reportingDateTime',
  'sire',
  'startDateTime',
  'type'
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  constructor(public eventsFacadeService: EventsFacadeService) {
  }

  tableKeys = TABLE_KEYS;
  tableHeaders =
    ['Actions', ...this.tableKeys.map(key => key.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1"))]

  editableCell = new BehaviorSubject<{ eventId: number; key: keyof AnimalEvent } | null>(null)
  editableCell$ = this.editableCell.asObservable();

  inputValue = '';

  ngOnInit(): void {
    this.eventsFacadeService.getList();
  }

  enterEditMode(event: AnimalEvent, key: string): void {
    this.editableCell.next({
      eventId: event.eventId, key,
    })

    this.inputValue = event[key] as string;
  }

  public leaveEditMode(e: Event): void {
    e.stopPropagation();

    this.editableCell.next(null)
  }

  public saveCell(e: Event, event: AnimalEvent, key: string): void {
    this.eventsFacadeService.editEvent(event.eventId, {
      key,
      value: this.inputValue
    })

    this.leaveEditMode(e);
  }

  public deleteRow(id: number): void {
    this.eventsFacadeService.deleteEvent(id)
  }

  public addRow(id: number): void {
    // left here
    this.eventsFacadeService.deleteEvent(id)
  }
}
