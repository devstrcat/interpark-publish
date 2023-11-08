window.addEventListener("load", function () {
  const fileName = "json/event.json";
  const xhe = new XMLHttpRequest();
  xhe.open("GET", fileName);
  xhe.send();
  xhe.onreadystatechange = function (event) {
    if (event.target.readyState === XMLHttpRequest.DONE) {
      const res = event.target.response;
      const json = JSON.parse(res);
      makeHtmlTag(json);
    }
  };

  function makeHtmlTag(_res) {
    let htmlEventTag = ``;

    for (let i = 0; i < _res.total; i++) {
      const index = i + 1;
      const obj = _res["event_" + index];

      const tempTag = `
      <div class="swiper-slide">
        <div class="event-slide-item">
          <a href="${obj.url}">
            <img src="${obj.file}" alt="${obj.url}" />
          </a>
        </div>
      </div>
    `;
      htmlEventTag += tempTag;
    }

    const eventSlide = document.querySelector(".event-slide .swiper-wrapper");
    eventSlide.innerHTML = htmlEventTag;

    const eventSwiper = new Swiper(".event-slide", {
      spaceBetween: 24,
      slidesPerView: 4,
      slidesPerGroup: 4,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".event-slide-next",
        prevEl: ".event-slide-prev",
      },
    });
  }
});
