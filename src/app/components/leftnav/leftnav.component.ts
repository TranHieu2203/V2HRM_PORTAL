import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-leftnav',
  templateUrl: './leftnav.component.html',
  styleUrls: ['./leftnav.component.css']
})
export class LeftnavComponent implements OnInit {

  navClass?: string;

  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    this.menuService.isOpen.subscribe((value: boolean) => {
      this.navClass = value? " nav-active" : "";
    })
  }

}
