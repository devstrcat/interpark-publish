// 모든 js 는 html 태그를 로드완료하고 실행해야 안전하다.
// 그런데 현재 .js 파일을 head 태그에서 불러들이므로 불안전하다.
// 오류가 날 확률이 무척 높다.
// 아래의 window 는 웹브라우저다.
// onload 절대로 소문자로 작성합니다. (약속되어 있습니다.)
// 웹브라우저에 html, css, js, image..
// 로드 완료 하면 function 을 한다라고 약속을 하였다.
window.addEventListener("load", function () {
  // 추천 상품 슬라이드 기능
  // 글로써 코딩 시나리오 작성 : 의사코드
  // 1. 외부 데이터를 불러온다.
  // : 외부 데이터 파일명.json
  const fileName = "recommend.json";

  const xhr = new XMLHttpRequest();
  xhr.open("GET", fileName);
  xhr.send();
  xhr.onreadystatechange = function (event) {
    //   console.log(event.target);
    if (event.target.readyState === XMLHttpRequest.DONE) {
      const result = JSON.parse(event.target.response);
      //   console.log(result);

      makeRecommendSlideHtml(result);
    }
  };

  function makeRecommendSlideHtml(_data) {
    const recommendRes = _data;
    let recommendHtml = "";

    // 출력을 시켜줄 문장을 만들자

    // total만큼 반복하자
    // for은 반복을 하는데 true인 경무만 반복한다
    for (let i = 1; i <= recommendRes.total; i++) {
      let temp = `
      <div class="swiper-slide">
        <div class="recommend-slide-item">
          <a href="${
            recommendRes["recommend_" + i].url
          }" class="recommend-link">
            <div class="recommend-img">
                <img src="${recommendRes["recommend_" + i].file}" alt="${
        recommendRes["recommend_" + i].url
      }" />
            </div>
            <div class="recommend-info">
              <ul class="recommend-good-list">
                <li>
                  <span class="recommend-good-info-price">
                    <b>${recommendRes["recommend_" + i].b}</b>
                    <em>${recommendRes["recommend_" + i].em}</em>원~
                  </span>
                </li>
                <li>
                  <p class="recommend-good-info-desc">
                  ${recommendRes["recommend_" + i].p}
                  </p>
                </li>
              </ul>
            </div>
          </a>
        </div>
      </div>
      `;
      recommendHtml += temp;
    }
    // console.log(temp);

    // 어디다가 자료를 출력할 것인지 지정
    const recommendSlide = document.querySelector(
      ".recommend-slide .swiper-wrapper"
    );
    recommendSlide.innerHTML = recommendHtml;

    const recommendSwiper = new Swiper(".recommend-slide", {
      breakpoints: {
        1280: {
          slidesPerView: 4,
          slidesPerGroup: 4,
        },
      },
      spaceBetween: 26,
      navigation: {
        nextEl: ".recommend-slide-next",
        prevEl: ".recommend-slide-prev",
      },
    });
  }
});
