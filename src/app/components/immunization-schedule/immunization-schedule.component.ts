import { Component, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf';

import { ImmunizationScheduleService } from 'src/app/services/immunization-schedule.service';

@Component({
  selector: 'app-immunization-schedule',
  templateUrl: './immunization-schedule.component.html',
  styleUrls: ['./immunization-schedule.component.css']
})
export class ImmunizationScheduleComponent implements OnInit {
  immunizationSchedule: any[] = [];

  constructor(private immunizationScheduleService: ImmunizationScheduleService) { }

  ngOnInit(): void {
    this.immunizationScheduleService.getImmunizationSchedule().subscribe(
      (data) => {
        this.immunizationSchedule = data.map((schedule, index) => ({
          ...schedule,
          ageInWeeks: Math.floor(schedule.ageInDays / 7),
          index: index + 1,
        }));
      },
      (error) => {
        console.error('Error fetching immunization schedule', error);
      }
    );
  }

  generatePDF(): void {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4'
    });
    const pdfElement = document.getElementById('pdfContent');

    doc.html(pdfElement!, {
      callback: (pdf: jsPDF) => {
        pdf.save('ImmunizationSchedule.pdf');
      },
      x: 10,
      y: 10,
      width: 575,
      windowWidth: pdfElement!.clientWidth
    });
  }
}
