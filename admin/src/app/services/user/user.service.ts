import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../../../types/user.type';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$: Observable<User | null> = this.userSubject.asObservable();

  constructor(private apollo: Apollo) {}

  logout$() {
    this.userSubject.next(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  initUser$(): void {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (!accessToken) {
      this.userSubject.next(null);
      return;
    }

    this.apollo
      .query<Data>({
        query: GetLoggedInUser,
        context: {
          headers: {
            accessToken: `${accessToken}`,
            refreshToken: `${refreshToken}`,
          },
        },
      })
      .subscribe(
        ({ data, loading }) => {
          this.userSubject.next(data.getLoggedInUser.user);
        },
        (err) => {
          console.error(err);
          this.userSubject.next(null);
        }
      );
  }

  isAuthenticated$(): Observable<boolean> {
    return this.user$.pipe(
      map((user) => this.isUserAuthenticated(user))
    );
  }

  private isUserAuthenticated(user: User | null): boolean {
    const isAccessTokenValid = this.isAccessTokenValid();
    const isRefreshTokenValid = this.isRefreshTokenValid();
    const isUserValid = this.isUserValid(user);

    return isAccessTokenValid && isRefreshTokenValid && isUserValid;
  }

  private isAccessTokenValid(): boolean {
    const accessToken = localStorage.getItem('accessToken');
    return !!accessToken && accessToken.length > 0;
  }

  private isRefreshTokenValid(): boolean {
    const refreshToken = localStorage.getItem('refreshToken');
    return !!refreshToken;
  }

  private isUserValid(user: User | null): boolean {
    return !!user && !!user.email && user.role === 'User';
  }
}

const GetLoggedInUser = gql`
  query GetLoggedInUser {
    getLoggedInUser {
      accessToken
      refreshToken
      user {
        id
        name
        email
        role
        createdAt
      }
    }
  }
`;

interface Data {
  getLoggedInUser: GetLoggedInUser;
}

interface GetLoggedInUser {
  accessToken: string;
  refreshToken: string;
  user: User;
}
