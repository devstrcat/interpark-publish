window.addEventListener("load", function () {
  const initCate = "ticket1";
  const initFileName = "json/" + initCate + ".json";
  // 활성화된 버튼 설정
  document.querySelectorAll(".cate-bt").forEach(function (button) {
    if (button.getAttribute("data-category") === initCate) {
      button.classList.add("cate-bt-active");
    }
  });

  const xhti = new XMLHttpRequest();
  xhti.open("GET", initFileName);
  xhti.send();
  xhti.onreadystatechange = function (event) {
    if (event.target.readyState === XMLHttpRequest.DONE) {
      const res = event.target.response;
      const json = JSON.parse(res);
      makeHtmlTag(json);
    }
  };

  document
    .querySelectorAll(".ticket-list li .cate-bt")
    .forEach(function (button) {
      button.addEventListener("click", function () {
        // 모든 ticket-list li cate-bt 요소에서 cate-bt-active 클래스를 제거
        document
          .querySelectorAll(".ticket-list li .cate-bt")
          .forEach(function (el) {
            el.classList.remove("cate-bt-active");
          });

        // 클릭한 버튼에 cate-bt-active 클래스를 추가
        button.classList.add("cate-bt-active");

        // 클릭한 버튼의 data-category 속성을 이용하여 해당 JSON 파일 이름을 결정
        const category = button.getAttribute("data-category");
        const fileName = "json/" + category + ".json";

        // XMLHttpRequest를 사용하여 JSON 파일 로드
        const xhti = new XMLHttpRequest();
        xhti.open("GET", fileName);
        xhti.send();
        xhti.onreadystatechange = function (event) {
          if (event.target.readyState === XMLHttpRequest.DONE) {
            const res = event.target.response;
            const json = JSON.parse(res);
            makeHtmlTag(json);
          }
        };
      });
    });

  function makeHtmlTag(_res) {
    let htmlTicketTag = ``;

    for (let i = 0; i < _res.total; i++) {
      const index = i + 1;
      const obj = _res["ticket_" + index];

      if (i !== _res.total - 1) {
        tempTag = `
        <div class="swiper-slide">
        <div class="ticket-slide-item">
          <a href="${obj.url}" 
          class="ticket-link">
            <div class="ticket-img">
              <img src="${obj.file}" 
              alt="${obj.url}" />
            </div>
            <div class="ticket-info">
              <div class="ticket-count">${obj.count}</div>
              <ul class="ticket-good-list">
                <li class="ticket-good-info-title">
                  <span>${obj.title}</span>
                </li>
                <li class="ticket-good-info-place">
                  <span>${obj.place}</span>
                </li>
                <li class="ticket-good-info-duration">
                  <span>${obj.duration}</span>
                </li>
                <li class="ticket-good-info-tag">
                  <span class="${obj.class}">${obj.txt}</span>
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
        <div class="ticket-slide-item-btnmore">
          <a href="${obj.url}" class="ticket-link">
            <i></i>
            <g>전체보기</g>
          </a>
        </div>
      </div>
          `;
      }

      htmlTicketTag += tempTag;
    }
    const ticketSlide = document.querySelector(".ticket-slide .swiper-wrapper");
    ticketSlide.innerHTML = htmlTicketTag;

    const ticketSwiper = new Swiper(".ticket-slide", {
      slidesPerView: 4,
      slidesPerGroup: 4,
      spaceBetween: 28,
      navigation: {
        nextEl: ".ticket-slide-next",
        prevEl: ".ticket-slide-prev",
      },
    });
  }
});
