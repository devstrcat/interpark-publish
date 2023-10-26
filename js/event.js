// 백엔드 Response 데이터
// 전체 비주얼 슬라이드 숫자 : 20개

// 각각 필요로 한 항목이 무엇인가
//  - 이미지 경로 필요
//  - 클릭했을 떄 이동할 경로(URL)
const xhc = new XMLHttpRequest();
xhc.open("GET", "event.json");
xhc.send();
xhc.onreadystatechange = function (event) {
  //   console.log(event.target);
  if (event.target.readyState === XMLHttpRequest.DONE) {
    console.log("자료왔다!!");
    console.log(event.target.response);
    const result = JSON.parse(event.target.response);
    console.log(result);

    makeEventSlideHtml(result);
  }
};

function makeEventSlideHtml(_data) {
  const eventRes = _data;
  let eventHtml = "";

  // 출력을 시켜줄 문장을 만들자

  // total만큼 반복하자
  // for은 반복을 하는데 true인 경무만 반복한다
  for (let i = 1; i <= eventRes.total; i++) {
    let temp = `
<div class="swiper-slide">
<div class="event-slide-item">
<a href="${eventRes["event_" + i].url}">
<img src="${eventRes["event_" + i].file}" alt="${eventRes["event_" + i].url}" />
</a>
</div>
</div>
`;
    console.log(temp);
    eventHtml += temp;
  }

  // 어디다가 자료를 출력할 것인지 지정
  const eventSlide = document.querySelector(".event-slide .swiper-wrapper");
  eventSlide.innerHTML = eventHtml;

  var swiper = new Swiper(".event-slide", {
    slidesPerView: 4,
    spaceBetween: 26,
    // loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    // speed: 500,
    navigation: {
      nextEl: ".event-slide-next",
      prevEl: ".event-slide-prev",
    },
  });
}

console.log(eventRes);
