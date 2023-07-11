import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-darkbutton',
  templateUrl: './darkbutton.component.html',
  styleUrls: ['./darkbutton.component.css']
})
export class DarkbuttonComponent implements OnInit {

  clickedClass: string = "clicked";
  theme?: string | null;
  lightTheme: string = "theme-light";
  darkTheme: string = "theme-dark";
  body = document.body;
  spanClass = this.theme === this.darkTheme ? this.clickedClass : "";
  iconClass = this.theme === this.darkTheme ? "feather-sun" : "feather-moon";

  constructor() { }

  ngOnInit(): void {
    
  
    if (localStorage) {
      this.theme = localStorage.getItem("theme");
    }
  
    if (this.theme === this.lightTheme || this.theme === this.darkTheme) {
      this.body.classList.add(this.theme)
    } else {
      this.body.classList.add(this.lightTheme)
    }
  }

  switchTheme(e: any): void {
    if (this.theme === this.darkTheme) {
      this.body.classList.replace(this.darkTheme, this.lightTheme);
      e.target.classList.remove(this.clickedClass);
      localStorage.setItem("theme", this.lightTheme);
      this.theme = this.lightTheme;
      this.iconClass = "feather-moon";
      $('html').removeClass('html-dark');


    } else {
      this.body.classList.replace(this.lightTheme, this.darkTheme);
      e.target.classList.add(this.clickedClass);
      localStorage.setItem("theme", this.darkTheme);
      this.theme = this.darkTheme;
      this.iconClass = "feather-sun";
      $('html').addClass('html-dark');

    }
  }

}
