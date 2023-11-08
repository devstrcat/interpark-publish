window.addEventListener("load", function () {
  // 초기로드 시 tour1 버튼 활성화와 tour1.json 파일 로드
  const initCate = "tour1";
  const initFileName = "json/" + initCate + ".json";
  // 활성화된 버튼 설정
  document.querySelectorAll(".cate-bt").forEach(function (button) {
    if (button.getAttribute("data-category") === initCate) {
      button.classList.add("cate-bt-active");
    }
  });
  // XMLHttpRequest를 사용하여 초기로드에 tour1.json 파일 로드
  const xhto = new XMLHttpRequest();
  xhto.open("GET", initFileName);
  xhto.send();
  xhto.onreadystatechange = function (event) {
    if (event.target.readyState === XMLHttpRequest.DONE) {
      const res = event.target.response;
      const json = JSON.parse(res);
      makeHtmlTag(json);
    }
  };

  document
    .querySelectorAll(".tour-list li .cate-bt")
    .forEach(function (button) {
      button.addEventListener("click", function () {
        // 모든 tour-list li cate-bt 요소에서 cate-bt-active 클래스를 제거
        document
          .querySelectorAll(".tour-list li .cate-bt")
          .forEach(function (el) {
            el.classList.remove("cate-bt-active");
          });

        // 클릭한 버튼에 cate-bt-active 클래스를 추가
        button.classList.add("cate-bt-active");

        // 클릭한 버튼의 data-category 속성을 이용하여 해당 JSON 파일 이름을 결정
        const category = button.getAttribute("data-category");
        const fileName = "json/" + category + ".json";

        // XMLHttpRequest를 사용하여 JSON 파일 로드
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
      });
    });

  function makeHtmlTag(_res) {
    let htmlTourTag = ``;

    for (let i = 0; i < _res.total; i++) {
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
