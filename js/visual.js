window.addEventListener("load", function () {
  const fileName = "json/visual.json";
  const xhv = new XMLHttpRequest();
  xhv.open("GET", fileName);
  xhv.send();
  xhv.onreadystatechange = function (event) {
    if (event.target.readyState === XMLHttpRequest.DONE) {
      const res = event.target.response;
      const json = JSON.parse(res);
      makeHtmlTag(json);
    }
  };

  function makeHtmlTag(_res) {
    let htmlVisualTag = ``;

    for (let i = 1; i < _res.total; i++) {
      const index = i + 1;
      const obj = _res["visual_" + index];

      const tempTag = `
      <div class="swiper-slide">
        <div class="visual-slide-item">
          <a href="${obj.url}">
            <img src="${obj.file}" alt="${obj.url}" />
          </a>
        </div>
      </div>
    `;
      htmlVisualTag += tempTag;
    }

    const visualSlide = document.querySelector(".visual-slide .swiper-wrapper");
    visualSlide.innerHTML = htmlVisualTag;

    var visualSwiper = new Swiper(".visual-slide", {
      slidesPerView: 2,
      spaceBetween: 24,
      loop: true,
      autoplay: {
        delay: 1000,
        disableOnInteraction: false,
      },
      speed: 500,
      navigation: {
        nextEl: ".visual-slide-next",
        prevEl: ".visual-slide-prev",
      },
    });
  }
});
