import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { IMember } from '../_models/member';
import { MembersService } from '../_services/members.service';

@Injectable({
  providedIn: 'root'
})
export class MemberDetailedResolver implements Resolve<IMember> {
  constructor(private memberService: MembersService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMember> {
    return this.memberService.getMember(route.paramMap.get('username')!)
  }
}
