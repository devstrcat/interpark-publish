window.addEventListener("load", function () {
  // 숫자에 콤마를 출력한 함수
  function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const initCate = "recommend1";
  const initFileName = "json/" + initCate + ".json";
  // 활성화된 버튼 설정
  document.querySelectorAll(".cate-bt").forEach(function (button) {
    if (button.getAttribute("data-category") === initCate) {
      button.classList.add("cate-bt-active");
    }
  });

  const xhr = new XMLHttpRequest();
  xhr.open("GET", initFileName);
  xhr.send();
  xhr.onreadystatechange = function (event) {
    if (event.target.readyState === XMLHttpRequest.DONE) {
      const res = event.target.response;
      const json = JSON.parse(res);
      makeHtmlTag(json);
    }
  };

  document
    .querySelectorAll(".recommend-list li .cate-bt")
    .forEach(function (button) {
      button.addEventListener("click", function () {
        // 모든 recommend-list li cate-bt 요소에서 cate-bt-active 클래스를 제거
        document
          .querySelectorAll(".recommend-list li .cate-bt")
          .forEach(function (el) {
            el.classList.remove("cate-bt-active");
          });

        // 클릭한 버튼에 cate-bt-active 클래스를 추가
        button.classList.add("cate-bt-active");

        // 클릭한 버튼의 data-category 속성을 이용하여 해당 JSON 파일 이름을 결정
        const category = button.getAttribute("data-category");
        const fileName = "json/" + category + ".json";

        // XMLHttpRequest를 사용하여 JSON 파일 로드
        const xhr = new XMLHttpRequest();
        xhr.open("GET", fileName);
        xhr.send();
        xhr.onreadystatechange = function (event) {
          if (event.target.readyState === XMLHttpRequest.DONE) {
            const res = event.target.response;
            const json = JSON.parse(res);
            makeHtmlTag(json);
          }
        };
      });
    });

  // html 태그를 만드는 기능
  function makeHtmlTag(_res) {
    // 기능 작성

    // 전달받은 문자열을 js 에서 사용하도록 JSON 데이터로 해석(parse)하여 객체화 { 원시데이터 묶음 } 한다.
    // console.log(_res);

    // 2. html 태그를 백틱을 이용해서 만든다.
    let htmlRecommendTag = ``;

    // 우리가 몇번 반복해야 하는지 안다.
    for (let i = 0; i < _res.total; i++) {
      const index = i + 1;
      const obj = _res["recommend_" + index];

      let tempTag = ``;

      // 마지막 json 에서는 url만 읽어들인다.
      // 그렇지 않으면 일반적으로 모두 출력한다.
      if (i !== _res.total - 1) {
        tempTag = `
        <div class="swiper-slide">
          <div class="recommend-slide-item">
            <a href="${obj.url}" class="recommend-link">
              <div class="recommend-img">
                  <img src="${obj.file}" alt="${obj.url}" />
              </div>
              <div class="recommend-info">
                <ul class="recommend-good-list">
                  <li>
                    <span class="recommend-good-info-price">
                      <b>${obj.discount === 0 ? "" : obj.discount + "%"}</b>
                      <em>${numberWithCommas(obj.price)}</em>원~
                    </span>
                  </li>
                  <li>
                    <p class="recommend-good-info-desc">
                    ${obj.p}
                    </p>
                  </li>
                </ul>
              </div>
            </a>
          </div>
        </div>
        `;
      } else {
        tempTag = `
        <div class="swiper-slide">
          <div class="recommend-slide-item-btnmore">
            <div class="recommend-slide-item-btnmore">
              <a href="${obj.url}" class="recommend-link">
                <i></i>
                <g>전체보기</g>
              </a>
            </div>
          </div>
        </div>
        `;
      }

      htmlRecommendTag += tempTag;
    }
    // console.log(htmlRecommendTag);
    // 3. swiper 태그에 백틱을 배치한다.
    const recommendSlide = document.querySelector(
      ".recommend-slide .swiper-wrapper"
    );
    recommendSlide.innerHTML = htmlRecommendTag;

    // 4. swiper 작동시킨다.
    const recommendSwiper = new Swiper(".recommend-slide", {
      slidesPerView: 4,
      slidesPerGroup: 4,
      spaceBetween: 26,
      navigation: {
        nextEl: ".recommend-slide-next",
        prevEl: ".recommend-slide-prev",
      },
    });
  }
});
