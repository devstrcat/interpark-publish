window.addEventListener("load", function () {
  const fileName = "ticket.json";

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
