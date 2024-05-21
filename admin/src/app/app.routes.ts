import { Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { UsersComponent } from './users/users.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ModerationComponent } from './moderation/moderation.component';
import { UserIDComponent } from './user-id/user-id.component';
import { AdminComponent } from './admin/admin.component';

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
    path: 'user/:id',
    component: UserIDComponent,
  },
  {
    path: 'moderation',
    component: ModerationComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: '**',
    component: NotfoundComponent
  }
];
