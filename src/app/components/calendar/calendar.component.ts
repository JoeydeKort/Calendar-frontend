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
  eventService: any;

  constructor(private calendarService: EventService) {
    this.eventService = calendarService;
  }

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
      events: (fetchInfo, successCallback, failureCallback) => {
        this.eventService.getEvents().subscribe(
          (events: any[]) => {
            const formattedEvents = events.map((event: any) => ({
              id: event.id.toString(),
              title: event.title,
              start: new Date(event.startDateTime).toISOString(),
              end: new Date(event.endDateTime).toISOString(),
            }));
            successCallback(formattedEvents);
          },
          (error: Error) => {
            console.error(error);
            failureCallback(error);
          }
        );
      },
    });
    calendar.render();
  }

  openAddEventPopup(): void {
    const popup = document.getElementById('addEventPopup') as HTMLElement;
    if (popup.style.display === 'block') {
      popup.style.display = 'none';
    } else {
      popup.style.display = 'block';
    }
  }

  saveEvent(): void {
    this.calendarService.addEvent(this.eventData).subscribe(
      (response) => {
        this.renderCalendar();
        this.openAddEventPopup();
        this.eventData = {};
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
