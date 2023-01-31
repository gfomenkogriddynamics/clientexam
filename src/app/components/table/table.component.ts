import { Component, OnInit } from '@angular/core';
import { EventsFacadeService } from "../../services";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  constructor(public eventsFacadeService: EventsFacadeService) {
  }

  tableKeys = [
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
  ]

  tableHeaders = this.tableKeys.map(key => key.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1"))

  ngOnInit(): void {
    this.eventsFacadeService.getList();
  }
}
