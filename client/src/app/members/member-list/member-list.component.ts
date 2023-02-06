import { Component, OnInit } from '@angular/core';
import { IMember } from 'src/app/models/member';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit{
  members: IMember[] = [];

  constructor(private memberService: MembersService) {}

  ngOnInit(): void {
    this._loadMembers();
  }

  private _loadMembers() {
    this.memberService.getMembers().subscribe({
      next: members => this.members = members
    })
  }
}
