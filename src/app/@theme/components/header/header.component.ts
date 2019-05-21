import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';

import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '../../../../app/@core/data/local-storage.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  user: any;
  Login:string="";
  crid:any;
  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserService,
              private analyticsService: AnalyticsService,private LocalStorageService: LocalStorageService,

              private router: Router) {
   

  }

  ngOnInit() {
   this.crid=this.LocalStorageService.retriveUserAccount();
  if(this.crid.Login){
  this.Login=this.crid.Login;
  }else if(this.crid[0].Login){
      this.Login=this.crid[0].Login;

  }
   if(this.crid[0].Username){
       this.Login=this.crid[0].Username;
  }
  

  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    //this.layoutService.changeLayoutSize();

    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');

    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
   logout() {

    this.LocalStorageService.clean();
    this.router.navigate(['/login']);

  }
}
