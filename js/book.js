window.addEventListener("load", function () {
  function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const fileName = "book.json";

  const xhb = new XMLHttpRequest();
  xhb.open("GET", fileName);
  xhb.send();
  xhb.onreadystatechange = function (event) {
    if (event.target.readyState === XMLHttpRequest.DONE) {
      const res = event.target.response;
      const json = JSON.parse(res);
      makeHtmlTag(json);
    }
  };

  function makeHtmlTag(_res) {
    let htmlBookTag = ``;

    for (let i = 0; i < _res.total; i++) {
      const index = i + 1;
      const obj = _res["book_" + index];

      const tempTag = `
      <div class="swiper-slide">
      <div class="book-slide-item">
        <a href="${obj.url}" class="book-link">
          <div class="book-img">
            <img src="${obj.file}" alt="${obj.url}" />
          </div>
          <div class="book-info">
            <ul class="book-good-list">
              <li>
                <span class="book-good-info-title">
                ${obj.title}
                </span>
              </li>
              <li>
                <p class="book-good-info-price">
                  <em>${numberWithCommas(obj.price)}</em>원
                </p>
              </li>
            </ul>
          </div>
        </a>
      </div>
    </div>
       `;

      htmlBookTag += tempTag;
    }
    const bookSlide = document.querySelector(".book-slide .swiper-wrapper");
    bookSlide.innerHTML = htmlBookTag;

    const bookSwiper = new Swiper(".book-slide", {
      slidesPerView: 5,
      slidesPerGroup: 5,
      spaceBetween: 27,
      navigation: {
        nextEl: ".book-slide-next",
        prevEl: ".book-slide-prev",
      },
    });
  }
});
