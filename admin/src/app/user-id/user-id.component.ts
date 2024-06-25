import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MySidebarComponent } from '../../components/my-sidebar/my-sidebar.component';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { getProfileQuery } from '../../graphql/getProfile.action';

export interface Profile {
  info: string
  isPublic: boolean
  avatar_url: string
  user: User
}

export interface User {
  id: string
  name: string
  email: string
  password: string
  role: string
  createdAt: string
}

@Component({
  selector: 'app-user-id',
  standalone: true,
  imports: [MySidebarComponent],
  templateUrl: './user-id.component.html',
})
export class UserIDComponent implements OnInit {
  userID!: string | null;
  user!: Profile;
  loading = true
  private querySubscription?: Subscription;

  constructor(private route: ActivatedRoute, private router: Router, private apollo: Apollo) {}

  ngOnInit(): void {
      this.userID = this.route.snapshot.paramMap.get('id') || "";

      this.getUser(this.userID)
  }

  getUser(userID: string) {
    this.loading = true

    this.querySubscription = this.apollo.watchQuery({
      query: getProfileQuery,
      variables: {
        userName: this.userID
      }
    }).valueChanges.subscribe(
      this.handleSuccess.bind(this)
    )
  }

  handleSuccess(result: any) {
    const { profile } = result.data;
    this.user = profile
    this.loading = false
  }
}
