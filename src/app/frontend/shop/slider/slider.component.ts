import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, Renderer2, ViewChildren, QueryList, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit,AfterViewInit,OnDestroy {
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
    this.rd.insertBefore(this.Slider.nativeElement, last, this.slideList[0]);
    this.rd.appendChild(this.Slider.nativeElement, first);
    this.rd.setStyle(this.Slider.nativeElement, "transform", "translateX(" + -(this.slideList[this.slideIndex].clientWidth) + "px" + ")")
    this.rd.addClass(this.Nav.find((item, index) => index === (this.slideIndex - 1)).nativeElement, 'active');
    this.play();
  }

  play() {
    this.Interval = this.requestInterval(()=>this.slideAuto(), 3000)
  }

  slideAuto(){
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
  }

  navActive() {
    this.Nav.forEach((item) => {
      this.rd.removeClass(item.nativeElement, 'active');
    })
    if (this.slideIndex < (this.slideList.length - 1)) {
      this.rd.addClass(this.Nav.find((item, index) => index === (this.slideIndex - 1)).nativeElement, 'active');
    } else {
      this.rd.removeClass(this.Nav.find((item, index) => index === 2).nativeElement, 'active');
      this.rd.addClass(this.Nav.find((item, index) => index === 0).nativeElement, 'active');
    }
  }

  currentSlide(i: number) {
    this.clearRequestInterval(this.Interval);
    setTimeout(() => {
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
    this.clearRequestInterval(this.Interval);
    setTimeout(() => {
      this.slideIndex = (this.slideIndex + i)

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
        this.play();
      }, 10);

      if (this.slideIndex >= this.slideList.length - 1) {
        console.log(this.slideIndex);
        this.slideIndex = 1
        this.rd.removeStyle(this.Slider.nativeElement, "transition");
        this.rd.setStyle(this.Slider.nativeElement, "transform", "translateX(0px)")
      }
    }, 500);
  }

  requestInterval = function (fn: any, delay: any) {
    if (!window.requestAnimationFrame &&
      !window.webkitRequestAnimationFrame){
      return window.setInterval(fn, delay);
    }

    var start = new Date().getTime(),
      handle: { [value: string]: any } = new Object();

    function loop() {
      var current = new Date().getTime(),
        delta = current - start;

      if (delta >= delay) {
        fn.call();
        start = new Date().getTime();
      }

      handle.value = window.requestAnimationFrame(loop);
      
    };

    handle.value = window.requestAnimationFrame(loop);
    return handle;
  }

  clearRequestInterval = function (handle: any) {
    window.cancelAnimationFrame ? window.cancelAnimationFrame(handle.value) :
      window.webkitCancelAnimationFrame ? window.webkitCancelAnimationFrame(handle.value) :
        clearInterval(handle);
  };

  ngOnDestroy(){
    this.clearRequestInterval(this.Interval);
  }
}
