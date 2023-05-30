import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { EventService } from '../../event.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit, AfterViewInit {
  eventData: any = {};

  constructor(private calendarService: EventService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.renderCalendar();
    });
  }

  renderCalendar(): void {
    const calendarEl = document.getElementById('calendar') as HTMLElement;
    const calendar = new Calendar(calendarEl, {
      plugins: [dayGridPlugin, timeGridPlugin],
      initialView: 'dayGridMonth',
    });
    calendar.render();
  }

  openAddEventPopup(): void {
    this.eventData = {};
    const popup = document.getElementById('addEventPopup') as HTMLElement;
    popup.style.display = 'block';
  }

  saveEvent(): void {
    this.calendarService.addEvent(this.eventData).subscribe(
      (response) => {
        this.renderCalendar();
        this.closeAddEventPopup();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  closeAddEventPopup(): void {
    const popup = document.getElementById('addEventPopup') as HTMLElement;
    popup.style.display = 'none';
  }
}
