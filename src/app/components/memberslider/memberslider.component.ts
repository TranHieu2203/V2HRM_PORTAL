import { Component, OnInit } from '@angular/core';
import { RandomAvatarService } from 'src/app/services/random-avatar.service';

@Component({
  selector: 'app-memberslider',
  templateUrl: './memberslider.component.html',
  styleUrls: ['./memberslider.component.css']
})
export class MembersliderComponent implements OnInit {

  memberList = [
    {
      bgUrl: "https://miukafoto.com/Content/shared_pictures/20220629150349_tan_2_children_ha_giang_feb_2016.jpg",
      imageUrl: this.randomAvatarService.get(),
      name: 'Yên Minh ',
      email: 'yenminh@gmail.com',
    },
    {
      bgUrl: "https://miukafoto.com/Content/shared_pictures/20220629145533_tan_ha_giang_feb_2016.jpg",
      imageUrl: this.randomAvatarService.get(),
      name: 'Đồng Văn ',
      email: 'dongvan@gmail.com',
    },
    {
      bgUrl: "https://miukafoto.com/Content/shared_pictures/20201105104531_Trang_An_2018_01.jpg",
      imageUrl: this.randomAvatarService.get(),
      name: 'Tràng An ',
      email: 'trangan@gmail.com',
    },
    {
      bgUrl: "https://miukafoto.com/Content/shared_pictures/20220625220742_2018_JUNE.jpg",
      imageUrl: this.randomAvatarService.get(),
      name: 'Nhật Tân ',
      email: 'nhattan@gmail.com',
    },
    {
      bgUrl: "https://miukafoto.com/Content/shared_pictures/20220627223501_tan_kharkiv_ukraine_october_2011.jpg",
      imageUrl: this.randomAvatarService.get(),
      name: 'Kharkiv ',
      email: 'kharkiv@gmail.com',
    },
    {
      bgUrl: "https://miukafoto.com/Content/shared_pictures/20201105113632_Ha_Giang_2019_02.jpg",
      imageUrl: this.randomAvatarService.get(),
      name: 'Mèo Vạc ',
      email: 'meovac@gmail.com',
    },
    {
      bgUrl: "https://miukafoto.com/Content/shared_pictures/20220627113830_tan_hanoi_manzi_sep_2017.jpg",
      imageUrl: this.randomAvatarService.get(),
      name: 'Manzi ',
      email: 'manzi@gmail.com',
    },
  ]

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: false,
    nextArrow: false,
  };

  constructor(private randomAvatarService: RandomAvatarService) { }

  ngOnInit(): void {
  }

}
