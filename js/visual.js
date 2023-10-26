// 백엔드 Response 데이터
// 전체 비주얼 슬라이드 숫자 : 6개

// 각각 필요로 한 항목이 무엇인가
//  - 이미지 경로 필요
//  - 클릭했을 떄 이동할 경로(URL)
const xh = new XMLHttpRequest();
xh.open("GET", "visual.json");
xh.send();
xh.onreadystatechange = function (event) {
  //   console.log(event.target);
  if (event.target.readyState === XMLHttpRequest.DONE) {
    console.log("자료왔다!!");
    console.log(event.target.response);
    const result = JSON.parse(event.target.response);
    console.log(result);

    makeVisualSlideHtml(result);
  }
};

function makeVisualSlideHtml(_data) {
  const visualRes = _data;
  let visualHtml = "";

  // 출력을 시켜줄 문장을 만들자

  // total만큼 반복하자
  // for은 반복을 하는데 true인 경무만 반복한다
  for (let i = 1; i <= visualRes.total; i++) {
    let temp = `
<div class="swiper-slide">
<div class="visual-slide-item">
<a href="${visualRes["visual_" + i].url}">
<img src="${visualRes["visual_" + i].file}" alt="${
      visualRes["visual_" + i].url
    }" />
</a>
</div>
</div>
`;
    console.log(temp);
    visualHtml += temp;
  }

  // 어디다가 자료를 출력할 것인지 지정
  const visualSlide = document.querySelector(".visual-slide .swiper-wrapper");
  visualSlide.innerHTML = visualHtml;

  var swiper = new Swiper(".visual-slide", {
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

// console.log(visualRes);
