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
  const fileName = "ticket.json";

  const xhti = new XMLHttpRequest();
  xhti.open("GET", fileName);
  xhti.send();
  xhti.onreadystatechange = function (event) {
    //   console.log(event.target);
    if (event.target.readyState === XMLHttpRequest.DONE) {
      const result = JSON.parse(event.target.response);
      //   console.log(result);

      makeTicketSlideHtml(result);
    }
  };

  function makeTicketSlideHtml(_data) {
    const ticketRes = _data;
    let ticketHtml = "";

    // 출력을 시켜줄 문장을 만들자

    // total만큼 반복하자
    // for은 반복을 하는데 true인 경무만 반복한다
    for (let i = 1; i <= ticketRes.total; i++) {
      let temp = `
      <div class="swiper-slide">
      <div class="ticket-slide-item">
        <a href="${ticketRes["ticket_" + i].url}" class="ticket-link">
          <div class="ticket-img">
            <img src="${ticketRes["ticket_" + i].file}" alt="${
        ticketRes["ticket_" + i].url
      }" />
          </div>
          <div class="ticket-info">
            <ul class="ticket-good-list">
              <li class="ticket-good-info-title">
                <span>${ticketRes["ticket_" + i].title}</span>
              </li>
              <li class="ticket-good-info-place">
                <span>${ticketRes["ticket_" + i].place}</span>
              </li>
              <li class="ticket-good-info-duration">
                <span>${ticketRes["ticket_" + i].duration}</span>
              </li>
              <li class="ticket-good-info-tag">
                <span class="blue">좌석우위</span>
                </li>
            </ul>
          </div>
        </a>
      </div>
    </div>
        `;
      ticketHtml += temp;
    }
    // console.log(temp);

    // 어디다가 자료를 출력할 것인지 지정
    const ticketSlide = document.querySelector(".ticket-slide .swiper-wrapper");
    ticketSlide.innerHTML = ticketHtml;

    const ticketSwiper = new Swiper(".ticket-slide", {
      breakpoints: {
        1280: {
          slidesPerView: 4,
          slidesPerGroup: 4,
        },
      },
      spaceBetween: 28,
      navigation: {
        nextEl: ".ticket-slide-next",
        prevEl: ".ticket-slide-prev",
      },
    });
  }
});
