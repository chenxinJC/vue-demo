import { fs } from 'utils/asd'

export const bannerSwiperOptions = {
  // direction: 'horizontal',
  // grabCursor: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  watchSlidesProgress: true,
  spaceBetween: fs(-8),
  // watchSlidesProgress: true,
  autoplay: {
    disableOnInteraction: false,
    delay: 3000
  },
  loop: true,
  pagination: {
    el: '.swiper-pagination'
  },
  on: {
    progress: function (a) {
      let swiperHeight = this.height
      for (let i = 0; i < this.slides.length; i++) {
        let slide = this.slides[i]
        let img = slide.children[0]
        let progress = slide.progress
        let asd = 1 - Math.min(Math.abs(progress), 1) / 10
        // console.log('==========', asd)
        slide.style.opacity = Math.round((1 - Math.min(Math.abs(progress / 2), 1)) * 10) / 10
        slide.style.height = asd * 100 + '%'
        slide.style.top = (1 - asd) / 2 * swiperHeight + 'px'
        img.style.width = asd * 100 + '%'
      }
    }
  }
}
