import { AuthenGuard } from './../_service/authen.guard';
import { HomeComponent } from './../home/home.component';
import { DepartmentSearchComponent } from './../master-department/department-search/department-search.component';
import { DepartmentCreateComponent } from './../master-department/department-create/department-create.component';
import { DepartmentUpdateComponent } from './../master-department/department-update/department-update.component';
import { DepartmentViewComponent } from './../master-department/department-view/department-view.component';
import { BranchGroupSearchComponent } from './../master-branch-group/branch-group-search/branch-group-search.component';
import { BranchGroupCreateComponent } from './../master-branch-group/branch-group-create/branch-group-create.component';
import { BranchGroupUpdateComponent } from './../master-branch-group/branch-group-update/branch-group-update.component';
import { BranchGroupViewComponent } from './../master-branch-group/branch-group-view/branch-group-view.component';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout.component';

import { MobileMenuComponent } from '../mobile-menu/mobile-menu.component';

import { BranchSaveComponent } from './../master-branch/branch-save/branch-save.component';
import { BranchViewComponent } from './../master-branch/branch-view/branch-view.component';
import { BranchSearchComponent } from './../master-branch/branch-search/branch-search.component';
import { MobileProfileComponent } from '../mobile-profile/mobile-profile.component';
import { InqUserComponent } from '../master-user/inq/inq-user.component';
import { CreateUserComponent } from '../master-user/create/create-user.component';
import { ViewUserComponent } from '../master-user/view/view-user.component';
import { UpdateUserComponent } from '../master-user/update/update-user.component';
import { ResetPasswordUserComponent } from '../master-user/reset-password/reset-user.component';
import { InqUserRoleComponent } from '../master-user-role/inq/inq-user-role.component';
import { CreateUserRoleComponent } from '../master-user-role/create/create-user-role.component';
import { ViewUserRoleComponent } from '../master-user-role/view/view-user-role.component';
import { UpdateUserRoleComponent } from '../master-user-role/update/update-user-role.component';

import { ChangePasswordComponent } from '../master-user/change-password/change-password.component';
import { MenuGroupSearchComponent } from '../master-menu-group/menu-group-search/menu-group-search.component';
import { MenuGroupCreateComponent } from '../master-menu-group/menu-group-create/menu-group-create.component';
import { MenuGroupUpdateComponent } from '../master-menu-group/menu-group-update/menu-group-update.component';
import { MenuGroupViewComponent } from '../master-menu-group/menu-group-view/menu-group-view.component';
import { MenuSearchComponent } from '../master-menu/menu-search/menu-search.component';
import { MenuViewComponent } from '../master-menu/menu-view/menu-view.component';
import { MenuCreateComponent } from '../master-menu/menu-create/menu-create.component';
import { MenuUpdateComponent } from '../master-menu/menu-update/menu-update.component';



const routes: Routes = [
  {
    path: 'app',
    component: LayoutComponent,
    children: [
      
      { path: 'home', component: HomeComponent, canActivate: [AuthenGuard] },
      { path: 'mobile-navigator', component: MobileMenuComponent, canActivate: [AuthenGuard] },
      { path: 'mobile-profile', component: MobileProfileComponent, canActivate: [AuthenGuard] },

      //branch
      { path: 'branch', component: BranchSearchComponent, canActivate: [AuthenGuard], data: { parentUrl: "/app/branch" } },
      { path: 'branch/add/:branchGroupId', component: BranchSaveComponent, canActivate: [AuthenGuard], data: { parentUrl: "/app/branch" } },
      { path: 'branch/view/:branchId', component: BranchViewComponent, canActivate: [AuthenGuard], data: { parentUrl: "/app/branch" } },
      { path: 'branch/edit/:branchId', component: BranchSaveComponent, canActivate: [AuthenGuard], data: { parentUrl: "/app/branch" } },
      

      //branch group
      { path: 'branch-group', component: BranchGroupSearchComponent, canActivate: [AuthenGuard], data: { parentUrl: "/app/branch-group" } },
      { path: 'branch-group/create', component: BranchGroupCreateComponent, canActivate: [AuthenGuard], data: { parentUrl: "/app/branch-group" } },
      { path: 'branch-group/update/:id', component: BranchGroupUpdateComponent, canActivate: [AuthenGuard], data: { parentUrl: "/app/branch-group" } },
      { path: 'branch-group/view/:id', component: BranchGroupViewComponent, canActivate: [AuthenGuard], data: { parentUrl: "/app/branch-group" } },

      //department
      { path: 'department', component: DepartmentSearchComponent, canActivate: [AuthenGuard], data: { parentUrl: "/app/department" } },
      { path: 'department/create', component: DepartmentCreateComponent, canActivate: [AuthenGuard], data: { parentUrl: "/app/department" } },
      { path: 'department/update/:departmentId', component: DepartmentUpdateComponent, canActivate: [AuthenGuard], data: { parentUrl: "/app/department" } },
      { path: 'department/view/:departmentId', component: DepartmentViewComponent, canActivate: [AuthenGuard], data: { parentUrl: "/app/department" } },

      //User
      { path: 'user', component: InqUserComponent, canActivate: [AuthenGuard], data: { parentUrl: "/app/user" } },
      { path: 'user/create', component: CreateUserComponent, canActivate: [AuthenGuard], data: { parentUrl: "/app/user" } },
      { path: 'user/view/:id', component: ViewUserComponent, canActivate: [AuthenGuard], data: { parentUrl: "/app/user" } },
      { path: 'user/update/:id', component: UpdateUserComponent, canActivate: [AuthenGuard], data: { parentUrl: "/app/user" } },
      { path: 'user/reset-password/:id', component: ResetPasswordUserComponent, canActivate: [AuthenGuard], data: { parentUrl: "/app/user" } },
      { path: 'user/change-password', component: ChangePasswordComponent },

      //User Role
      { path: 'user-role', component: InqUserRoleComponent, canActivate: [AuthenGuard], data: { parentUrl: "/app/user-role" } },
      { path: 'user-role/create', component: CreateUserRoleComponent, canActivate: [AuthenGuard], data: { parentUrl: "/app/user-role" } },
      { path: 'user-role/view/:id', component: ViewUserRoleComponent, canActivate: [AuthenGuard], data: { parentUrl: "/app/user-role" } },
      { path: 'user-role/update/:id', component: UpdateUserRoleComponent, canActivate: [AuthenGuard], data: { parentUrl: "/app/user-role" } },

      
      //menu-group 
      { path: 'menu-group', component: MenuGroupSearchComponent, canActivate: [AuthenGuard], data: { parentUrl: "/app/menu_group" } },
       { path: 'menu-group/create', component: MenuGroupCreateComponent, canActivate: [AuthenGuard], data: { parentUrl: "/app/menu_group" } },
       { path: 'menu-group/update/:menuFunctionGroupId', component: MenuGroupUpdateComponent, canActivate: [AuthenGuard], data: { parentUrl: "/app/menu_group" } },
       { path: 'menu-group/view/:menuFunctionGroupId', component: MenuGroupViewComponent, canActivate: [AuthenGuard], data: { parentUrl: "/app/menu_group" } },

      //menu
      { path: 'menu', component: MenuSearchComponent, canActivate: [AuthenGuard], data: { parentUrl: "/app/menu" } },
      { path: 'menu/create', component: MenuCreateComponent, canActivate: [AuthenGuard], data: { parentUrl: "/app/menu" } },
      { path: 'menu/update/:menuFunctionId', component: MenuUpdateComponent, canActivate: [AuthenGuard], data: { parentUrl: "/app/menu" } },
      { path: 'menu/view/:menuFunctionId', component: MenuViewComponent, canActivate: [AuthenGuard], data: { parentUrl: "/app/menu" } },

     

      

       { path: '**', redirectTo: 'home', pathMatch: 'full' },
    ]
  }
];

export const LayoutRoutingModule = RouterModule.forChild(routes);
