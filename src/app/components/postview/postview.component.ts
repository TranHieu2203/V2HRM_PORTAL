import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-postview',
  templateUrl: './postview.component.html',
  styleUrls: ['./postview.component.css']
})
export class PostviewComponent implements OnInit {

  @Input() id?: string;
  @Input() postvideo?: string;
  @Input() postimage?: string;
  @Input() avater?: string;
  @Input() user?: string;
  @Input() time?: string;
  @Input() des?: string;

  menuClass: string; 
  emojiClass: string;
  isOpen: boolean = false;
  isActive: boolean = false;

  toggleOpen = () => this.isOpen = !this.isOpen;
  toggleActive = () => this.isActive = !this.isActive;

  constructor() { 
    this.menuClass = `${this.isOpen ? " show" : ""}`;
    this.emojiClass = `${this.isActive ? " active" : ""}`;
  }

  ngOnInit(): void {
  }

}
