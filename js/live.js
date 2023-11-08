window.addEventListener("load", function () {
  function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const fileName = "json/live.json";

  const xhl = new XMLHttpRequest();
  xhl.open("GET", fileName);
  xhl.send();
  xhl.onreadystatechange = function (event) {
    if (event.target.readyState === XMLHttpRequest.DONE) {
      const res = event.target.response;
      const json = JSON.parse(res);
      makeHtmlTag(json);
    }
  };

  function makeHtmlTag(_res) {
    let htmlLiveTag = ``;

    for (let i = 0; i < _res.total; i++) {
      const index = i + 1;
      const obj = _res["live_" + index];

      if (obj.live_preparing.preparing_image === "") {
        tempTag = `
      <div class="swiper-slide">
        <div class="live-slide-item">
            <a href="${obj.live_info.url}" class="live-link">
                <div class="live-img">
                    <img src="${obj.live_info.image}" 
                    alt="${obj.live_info.url}" />    
                </div>
                <ul class="live-info">
                    <li>
                        <i>${obj.live_info.state}</i>
                    </li>
                    <li>
                        <span class="live-info-title">
                            ${obj.live_info.title}
                        </span>
                    </li>
                </ul>
                <div class="live-day">
                    <ul>
                        <li>
                            <span class="live-day-date">
                                ${obj.live_day.date}
                            </span>
                        </li>
                        <li>
                            <span class="live-day-time">
                                ${obj.live_day.time}
                            </span>
                        </li>
                    </ul>
                </div>
            </a>
            <a href="${obj.live_product.product_url}" class="live-product">
                <div class="${obj.live_product.product_class}">
                    <img src="${
                      obj.live_product.product_image === ""
                        ? ""
                        : obj.live_product.product_image
                    }" 
                    alt="${obj.live_product.product_url}" />
                </div>
                <ul class="live-product-info">
                    <li>
                        <span class="live-product-title">
                            ${obj.live_product.product_title}
                        </span>
                    </li>
                    <li>
                        <span class="live-product-discount">
                            <em>${
                              obj.live_product.product_discount === ""
                                ? ""
                                : obj.live_product.product_discount + "%"
                            }</em>
                        </span>
                        <span class="live-product-price">
                            <em>${
                              obj.live_product.product_price === ""
                                ? ""
                                : numberWithCommas(
                                    obj.live_product.product_price
                                  )
                            }</em>
                            ${
                              obj.live_product.product_dollar === ""
                                ? ""
                                : obj.live_product.product_dollar
                            }
                        </span>
                    </li>
                </ul>
            </a>
        </div>
      </div>
      `;
      } else {
        tempTag = `
        <div class="swiper-slide">
        <div class="live-slide-item live-preparing">
            <a href="${obj.live_preparing.preparing_url}" class="live-preparing-link">
                <ul class="live-preparing-info">
                    <li class="preparing-img">
                        <img src="${obj.live_preparing.preparing_image}"
                        alt="${obj.live_preparing.preparing_url}" />
                    </li>
                    <li>
                        <p class="preparing-txt">
                            ${obj.live_preparing.preparing_txt}
                        </p>
                    </li>
                    <li>
                        <span class="preparing-btn">
                            ${obj.live_preparing.preparing_btn}
                        </span>
                    </li>
                </ul>
            </a>
        </div>
      </div>
      `;
      }

      htmlLiveTag += tempTag;
    }
    const liveSlide = document.querySelector(".live-slide .swiper-wrapper");
    liveSlide.innerHTML = htmlLiveTag;

    const liveSwiper = new Swiper(".live-slide", {
      slidesPerView: 4,
      slidesPerGroup: 4,
      spaceBetween: 26,
      navigation: {
        nextEl: ".live-slide-next",
        prevEl: ".live-slide-prev",
      },
    });
  }
});
