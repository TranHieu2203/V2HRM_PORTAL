import { Component, OnInit } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'app-profilephoto',
  templateUrl: './profilephoto.component.html',
  styleUrls: ['./profilephoto.component.css']
})
export class ProfilephotoComponent implements OnInit {

  _albums = [
    {
      caption: '01',
      thumb: `https://miukafoto.com/Content/shared_pictures/20220629150349_tan_2_children_ha_giang_feb_2016.jpg`,
      src: `https://miukafoto.com/Content/shared_pictures/20220629150349_tan_2_children_ha_giang_feb_2016.jpg`,
      downloadUrl: ''
    },
    {
      caption: '02',
      thumb: `https://miukafoto.com/Content/shared_pictures/20220629145533_tan_ha_giang_feb_2016.jpg`,
      src: `https://miukafoto.com/Content/shared_pictures/20220629145533_tan_ha_giang_feb_2016.jpg`,
      downloadUrl: ''
    },
    {
      caption: '03',
      thumb: `https://miukafoto.com/Content/shared_pictures/20201105104531_Trang_An_2018_01.jpg`,
      src: `https://miukafoto.com/Content/shared_pictures/20201105104531_Trang_An_2018_01.jpg`,
      downloadUrl: ''
    },
    {
      caption: '04',
      thumb: `https://miukafoto.com/Content/shared_pictures/20220625220742_2018_JUNE.jpg`,
      src: `https://miukafoto.com/Content/shared_pictures/20220625220742_2018_JUNE.jpg`,
      downloadUrl: ''
    },
    {
      caption: '05',
      thumb: `https://miukafoto.com/Content/shared_pictures/20220627223501_tan_kharkiv_ukraine_october_2011.jpg`,
      src: `https://miukafoto.com/Content/shared_pictures/20220627223501_tan_kharkiv_ukraine_october_2011.jpg`,
      downloadUrl: ''
    },
    {
      caption: '06',
      thumb: `https://miukafoto.com/Content/shared_pictures/20201105113632_Ha_Giang_2019_02.jpg`,
      src: `https://miukafoto.com/Content/shared_pictures/20201105113632_Ha_Giang_2019_02.jpg`,
      downloadUrl: ''
    },
  ]

  constructor(private _lightbox: Lightbox) { }

  ngOnInit(): void { }

  open(index: number): void {
    // open lightbox
    this._lightbox.open(this._albums, index);
  }

  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }

}
