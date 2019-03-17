import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, Renderer2, ViewChildren, QueryList, ContentChildren, AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit, AfterViewInit {

  images = [
    {
      src: "../../../assets/slide1.jpeg"
    },
    {
      src: "../../../assets/slide2.jpeg"
    },
    {
      src: "../../../assets/slide3.jpeg"
    }
  ]

  @ViewChild('slider') Slider: ElementRef;
  @ViewChildren('nav', { read: ElementRef }) Nav: QueryList<ElementRef>;
  @ViewChildren('sliderChildren', { read: ElementRef }) SliderChildren: QueryList<ElementRef>
  slideIndex: number = 1;
  slideList: HTMLCollectionOf<Element>;
  Interval: any;

  constructor(private rd: Renderer2) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.slideList = document.getElementsByClassName('sliderList');
    const arr = Array.from(this.slideList);
    const first = arr[0].cloneNode(true);
    const last = arr[this.slideList.length - 1].cloneNode(true);
    this.rd.appendChild(this.Slider.nativeElement, first);
    this.rd.insertBefore(this.Slider.nativeElement, last, this.slideList[0]);
    this.rd.setStyle(this.Slider.nativeElement, "transform", "translateX(" + -(this.slideList[this.slideIndex].clientWidth) + "px" + ")")
    this.rd.addClass(this.Nav.find((item, index) => index === (this.slideIndex - 1)).nativeElement, 'active');
    this.play();
  }

  play() {
    this.Interval = setInterval(() => {
      let width: number = (this.slideList[this.slideIndex].clientWidth) * (this.slideIndex + 1)
      this.rd.setStyle(this.Slider.nativeElement, "transition", "transform 1s")
      this.rd.setStyle(this.Slider.nativeElement, "transform", "translateX(" + -(width) + "px" + ")")
      this.slideIndex = this.slideIndex + 1;
      this.navActive();
      if (this.slideIndex >= this.slideList.length) {
        this.rd.removeStyle(this.Slider.nativeElement, "transition");
        this.rd.setStyle(this.Slider.nativeElement, "transform", "translateX(" + -(this.slideList[0].clientWidth) + "px" + ")")

        this.slideIndex = 1
      }
    }, 3000)
  }

  navActive() {
    console.log(this.slideIndex);
    this.Nav.forEach((item) => {
      this.rd.removeClass(item.nativeElement, 'active');
    })
    if (this.slideIndex < (this.slideList.length - 1)) {
      this.rd.addClass(this.Nav.find((item, index) => index === (this.slideIndex-1)).nativeElement, 'active');
    } else {
      this.rd.removeClass(this.Nav.find((item, index) => index === 2).nativeElement, 'active');
      this.rd.addClass(this.Nav.find((item, index) => index === 0).nativeElement, 'active');
    }
  }

  currentSlide(i: number) {
    clearInterval(this.Interval);
    setTimeout(() => {
      console.log(i);
      this.rd.removeStyle(this.Slider.nativeElement, "transition");
      this.rd.setStyle(this.Slider.nativeElement, "transform", "translateX(" + -(this.slideList[i].clientWidth) * (i + 1) + "px" + ")")
      const remain = this.Nav.filter((item, index) => index != i);
      remain.forEach((item) => {
        this.rd.removeClass(item.nativeElement, 'active');
      })
      this.rd.addClass(this.Nav.find((item, index) => index === i).nativeElement, 'active');
      this.slideIndex = (i + 1);
      this.play();
    }, 500);
  }

  plusSlides(i: number) {
    console.log(this.slideIndex);
    clearInterval(this.Interval);
    setTimeout(() => {
      console.log(i);
      this.slideIndex = (this.slideIndex + i)
      console.log(this.slideIndex);

      if (this.slideIndex < 1) {
        this.slideIndex = this.slideList.length - 2
        console.log(this.slideIndex);
        this.rd.removeStyle(this.Slider.nativeElement, "transition");
        this.rd.setStyle(this.Slider.nativeElement, "transform", "translateX(" + -(this.slideList[0].clientWidth) * (this.slideList.length - 1) + "px" + ")")
      }
      setTimeout(() => {
        console.log(this.slideIndex);
        this.rd.setStyle(this.Slider.nativeElement, "transition", "transform 1s")
        let width: number = (this.slideList[this.slideIndex].clientWidth) * (this.slideIndex)
        this.rd.setStyle(this.Slider.nativeElement, "transform", "translateX(" + -(width) + "px" + ")")
        this.navActive();
      }, 10);

      if (this.slideIndex >= this.slideList.length - 1) {
        console.log(this.slideIndex);
        this.slideIndex = 1
        this.rd.removeStyle(this.Slider.nativeElement, "transition");
        this.rd.setStyle(this.Slider.nativeElement, "transform", "translateX(0px)")
      }
    }, 500);
  }

}
