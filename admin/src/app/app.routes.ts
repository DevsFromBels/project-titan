import { Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { UsersComponent } from './users/users.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ModerationComponent } from './moderation/moderation.component';

export const routes: Routes = [
  {
    path: '',
    component: SignInComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'moderation',
    component: ModerationComponent
  },
  {
    path: '**',
    component: NotfoundComponent
  }
];
