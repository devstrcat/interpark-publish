window.addEventListener("load", function () {
  const fileName = "tour.json";

  const xhto = new XMLHttpRequest();
  xhto.open("GET", fileName);
  xhto.send();
  xhto.onreadystatechange = function (event) {
    if (event.target.readyState === XMLHttpRequest.DONE) {
      const res = event.target.response;
      const json = JSON.parse(res);
      makeHtmlTag(json);
    }
  };

  function makeHtmlTag(_res) {
    let htmlTourTag = ``;

    for (let i = 1; i < _res.total; i++) {
      const index = i + 1;
      const obj = _res["tour_" + index];

      const tempTag = `
            <div class="swiper-slide">
            <div class="tour-slide-item">
            <a href="${obj.url}" class="tour-link">
            <div class="tour-img">
                <img src="${obj.file}" alt="${obj.url}" />
            </div>
            <div class="tour-info">
                <ul class="tour-good-list">
                <li>
                    <span class="tour-box">${obj.box}</span>
                </li>
                <li>
                    <p class="tour-p-blue">
                    ${obj.blue}
                    </p>
                </li>
                <li>
                    <p>
                    ${obj.p}
                    </p>
                </li>
                <li>
                    <span class="tour-good-info-price">
                    <em>${obj.price}</em>원~
                    </span>
                </li>
                </ul>
            </div>
            </a>
            </div>
            </div>
        `;
      htmlTourTag += tempTag;
    }

    const tourSlide = document.querySelector(".tour-slide .swiper-wrapper");
    tourSlide.innerHTML = htmlTourTag;

    const tourSwiper = new Swiper(".tour-slide", {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 26,
      navigation: {
        nextEl: ".tour-slide-next",
        prevEl: ".tour-slide-prev",
      },
    });
  }
});
