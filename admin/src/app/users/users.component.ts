import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { MyLoaderComponent } from '../../components/my-loader/my-loader.component';
import { User } from '../../types/user.type';
import { GetAllUsersProfiles } from '../../graphql/user-profiles.action';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [RouterLink, MyLoaderComponent],
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit, OnDestroy {
  public users: User[] = [];
  public loading = true;
  public errorMessage: string | null = null;
  private querySubscription?: Subscription;
  private isAuthenticatedSubscription?: Subscription;

  private static readonly LIMIT = '20';
  private static readonly PAGE = 0;
  private static readonly ERROR_MESSAGE = 'An error occurred while fetching user profiles.';

  constructor(private apollo: Apollo, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.isAuthenticatedSubscription = this.userService.isAuthenticated$().subscribe(
      (isAuthenticated) => {
        if (!isAuthenticated) {
          this.router.navigate(['/']);
        }
      }
    );

    this.fetchUserProfiles();
  }

  ngOnDestroy(): void {
    this.unsubscribeQuerySubscription();
    if (this.isAuthenticatedSubscription) {
      this.isAuthenticatedSubscription.unsubscribe();
    }
  }

  private fetchUserProfiles(): void {
    this.loading = true;
    this.errorMessage = null;

    this.querySubscription = this.apollo
      .watchQuery({
        query: GetAllUsersProfiles,
        variables: {
          limit: UsersComponent.LIMIT,
          page: UsersComponent.PAGE,
        },
      })
      .valueChanges.subscribe(
        this.handleSuccess.bind(this),
        this.handleError.bind(this)
      );
  }

  private handleSuccess(result: any): void {
    const { getAllUsersProfiles } = result.data;
    this.users = getAllUsersProfiles.users;
    this.loading = false;
  }

  private handleError(error: any): void {
    console.error(error);
    this.errorMessage = UsersComponent.ERROR_MESSAGE;
    this.loading = false;
  }

  private unsubscribeQuerySubscription(): void {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }
}
