window.addEventListener("load", function () {
  // 추천 상품 슬라이드 기능
  // 글로써 코딩 시나리오 작성 : 의사코드
  // 1. 외부 데이터를 불러온다.
  // : 외부 데이터 파일명.json
  const fileName = "tour.json";

  const xhto = new XMLHttpRequest();
  xhto.open("GET", fileName);
  xhto.send();
  xhto.onreadystatechange = function (event) {
    //   console.log(event.target);
    if (event.target.readyState === XMLHttpRequest.DONE) {
      const result = JSON.parse(event.target.response);
      //   console.log(result);

      makeTourSlideHtml(result);
    }
  };

  function makeTourSlideHtml(_data) {
    const tourRes = _data;
    let tourHtml = "";

    // 출력을 시켜줄 문장을 만들자

    // total만큼 반복하자
    // for은 반복을 하는데 true인 경무만 반복한다
    for (let i = 1; i <= tourRes.total; i++) {
      let temp = `
            <div class="swiper-slide">
            <div class="tour-slide-item">
            <a href="${tourRes["tour_" + i].url}" class="tour-link">
            <div class="tour-img">
                <img src="${tourRes["tour_" + i].file}" alt="${
        tourRes["tour_" + i].url
      }" />
            </div>
            <div class="tour-info">
                <ul class="tour-good-list">
                <li>
                    <span class="tour-box">${tourRes["tour_" + i].box}</span>
                </li>
                <li>
                    <p class="tour-p-blue">
                    ${tourRes["tour_" + i].blue}
                    </p>
                </li>
                <li>
                    <p>
                    ${tourRes["tour_" + i].p}
                    </p>
                </li>
                <li>
                    <span class="tour-good-info-price">
                    <em>${tourRes["tour_" + i].em}</em>원~
                    </span>
                </li>
                </ul>
            </div>
            </a>
            </div>
            </div>
        `;
      // console.log(temp);
      tourHtml += temp;
    }

    // 어디다가 자료를 출력할 것인지 지정
    const tourSlide = document.querySelector(".tour-slide .swiper-wrapper");
    tourSlide.innerHTML = tourHtml;

    const tourSwiper = new Swiper(".tour-slide", {
      breakpoints: {
        1280: {
          slidesPerView: 3,
          slidesPerGroup: 3,
        },
      },
      spaceBetween: 26,
      navigation: {
        nextEl: ".tour-slide-next",
        prevEl: ".tour-slide-prev",
      },
    });
  }
});
