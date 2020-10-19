import { Component, OnInit, ViewChild, Injector } from '@angular/core';
import { Router } from '@angular/router';
const screenfull = require('screenfull');

import { UserblockService } from '../sidebar/userblock/userblock.service';
import { SettingsService } from '../../../services/core/settings/settings.service';
import { MenuService } from '../../../services/core/menu/menu.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    navCollapsed = true; // for horizontal layout
    menuItems = []; // for horizontal layout
    router: Router;


    constructor(public menu: MenuService, 
                public userblockService: UserblockService,
                public settings: SettingsService,
                public injector: Injector) {

        // show only a few items on demo
        this.menuItems = menu.getMenu().slice(0, 4); // for horizontal layout

    }

    ngOnInit() {



        this.router = this.injector.get(Router);

        // Autoclose navbar on mobile when route change
        this.router.events.subscribe((val) => {
            // scroll view to top
            window.scrollTo(0, 0);
            // close collapse menu
            this.navCollapsed = true;
        });

    }

    toggleUserBlock(event) {
        event.preventDefault();
        this.userblockService.toggleVisibility();
    }




    toggleOffsidebar() {
        this.settings.toggleLayoutSetting('offsidebarOpen');
    }

    toggleCollapsedSideabar() {
        this.settings.toggleLayoutSetting('isCollapsed');
    }

    isCollapsedText() {
        return this.settings.getLayoutSetting('isCollapsedText');
    }

    toggleFullScreen(event) {
        if (screenfull.enabled) {
            screenfull.toggle();
        }
    }
}
