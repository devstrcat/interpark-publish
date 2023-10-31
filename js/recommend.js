// 모든 js 는 html 태그를 로드 완료하고 실행해야 안전하다.
// 그런데 현재 .js 파일을 head 태그에서 불러들이므로 불안전하다.
// 오류가 날 확률이 무척 높다.
// 아래의 window 는 웹브라우저다.
// onload 절대로 소문자로 작성입니다. (약속 되어 있습니다)
// 아래 문장 해석
// 웹브라우저에 html, css, js, image.. 로드 완료 하면 function 을 한다라고 약속을 하였다.

// window.onload = function () {
// 추천상품 기능
// };

// 웹브라우저 코딩하는 위치가 정해져있다 생각하자.
// window.load = function () {
//     코딩자리
// }
// window.addEventListener("load", function(){
//   코딩자리
// })
// $(document).ready(function(){
//    코딩자리
// })

window.addEventListener("load", function () {
  // 추천 상품 슬라이드 기능
  // 글로써 코딩 시나리오 작성 : 의사코드
  // 1. 외부 데이터를 불러온다.
  // :  외부 데이터 파일명.json
  const fileName = "recommend.json";

  // 외부 데이터 가져올때 작성법
  const xhr = new XMLHttpRequest();
  // 외부의 파일을 열어라
  // Get 방식으로 파일을 열어준다.
  xhr.open("GET", fileName);
  // 실제로 실행하자.
  xhr.send();
  // 데이터의 전송 상태를 체크합니다.
  xhr.onreadystatechange = function (event) {
    if (event.target.readyState === XMLHttpRequest.DONE) {
      // 코드가 가독성이 떨어지므로 변수에 담는다.
      // 규칙은 const 부터 작성하자.
      // const 가 문제가 된다면 let 으로 변경한다.
      const res = event.target.response;
      // res 를 전달해서 html 태그를 만든다.
      const json = JSON.parse(res);
      makeHtmlTag(json);
    }
  };

  // html 태그를 만드는 기능
  function makeHtmlTag(_res) {
    // 기능 작성
    // 전달받은 문자열을 js 에서 사용하도록 JSON 데이터로 해석(parse)하여 객체화 { 원시데이터 묶음 } 한다.
    // console.log(_res);

    // 2. html 태그를 백틱을 이용해서 만든다.
    let htmlRecommendTag = ``;
    // _res 에 담겨진 객체에서 total 을 보관한다.
    // const total = _res.total;
    // const recommend_1 = _res.recommend_1;
    // const recommend_2 = _res.recommend_2;
    // const recommend_3 = _res.recommend_3;
    // const recommend_4 = _res.recommend_4;
    // const recommend_5 = _res.recommend_5;
    // const recommend_6 = _res.recommend_6;
    // const recommend_7 = _res.recommend_7;
    // const recommend_8 = _res.recommend_8;
    // const recommend_9 = _res.recommend_9;
    // const recommend_10 = _res.recommend_10;
    // const recommend_11 = _res.recommend_11;
    // const recommend_12 = _res.recommend_12;

    // 우리가 몇번 반복해야 하는지 안다.
    for (let i = 0; i < _res.total; i++) {
      const index = i + 1;
      const obj = _res["recommend_" + index];

      const tempTag = `
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
                    <b>${obj.b}</b>
                    <em>${obj.em}</em>원~
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
