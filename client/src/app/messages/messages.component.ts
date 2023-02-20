import { Component, OnInit } from '@angular/core';
import { IMessage } from '../_models/message';
import { IPagination } from '../_models/pagination';
import { MessageService } from '../_services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit{
  messages?: IMessage[];
  pagination?: IPagination;
  container = 'Unread';
  pageNumber = 1;
  pageSize = 5;
  loading = false;

  constructor(
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadMessages();
  }

  public loadMessages() {
    this.loading = true;
    this.messageService.getMessages(this.pageNumber, this.pageSize, this.container).subscribe({
      next: response => {
        this.messages = response.result;
        this.pagination = response.pagination;
        this.loading = false;
      }
    });
  }

  public deleteMessage(id: number) {
    this.messageService.deleteMessage(id).subscribe({
      next: () => this.messages?.splice(this.messages.findIndex(m => m.id === id), 1)
    });
  }

  public pageChanged(event: any) {
    if (this.pageNumber !== event.page) {
      this.pageNumber = event.page;
      this.loadMessages();
    }
  }
}
