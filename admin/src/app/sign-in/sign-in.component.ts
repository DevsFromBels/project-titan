import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { MyButtonComponent } from '../../components/my-button/my-button.component';
import { Apollo } from 'apollo-angular';
import { MyLoaderComponent } from '../../components/my-loader/my-loader.component';
import { UserService } from '../services/user/user.service';
import { User } from '../../types/user.type';
import { Router } from '@angular/router';
import { LOGIN_USER } from '../../graphql/login.action';
import { MyInputComponent } from '../../components/my-input/my-input.component';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterLink, MyButtonComponent, MyLoaderComponent, MyInputComponent],
  templateUrl: './sign-in.component.html',
})
export class SignInComponent implements OnDestroy, OnInit {
  public querySubscription?: Subscription;
  public data?: any;
  public loading?: boolean = false;
  public user: User | null = null;
  public emailValue: string = '';
  public passwordValue: string = '';
  private userSubscription: Subscription | unknown;
  private isAuthenticatedSubscription: Subscription | unknown;

  constructor(
    private apollo: Apollo,
    private userService: UserService,
    private router: Router
  ) {}

  onEmailChange(value: string) {
    this.emailValue = value;
  }

  onPasswordChange(value: string) {
    this.passwordValue = value;
  }

  SignIn() {
    const email = this.emailValue;
    const password = this.passwordValue;
    this.loading = true;

    this.querySubscription = this.apollo
      .mutate<any>({
        mutation: LOGIN_USER,
        variables: {
          email: email,
          password: password,
        },
      })
      .subscribe(({ data }) => {
        this.data = data.login;
        this.loading = false;

        if (this.data.accessToken && this.data.refreshToken) {
          localStorage.setItem('accessToken', this.data.accessToken);
          localStorage.setItem('refreshToken', this.data.refreshToken);
          this.userService.initUser$();
          location.reload();
        }

        return;
      });
  }

  ngOnInit(): void {
    this.isAuthenticatedSubscription = this.userService
      .isAuthenticated$()
      .subscribe((isAuthenticated) => {
        if (isAuthenticated) {
          this.router.navigate(['/users']);
        }
        // console.log(isAuthenticated);
      });

    this.userService.initUser$();
  }

  ngOnDestroy(): void {
    this.querySubscription?.unsubscribe();
  }
}
