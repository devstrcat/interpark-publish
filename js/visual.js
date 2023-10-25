// 백엔드 Response 데이터
const xhttp = new XMLHttpRequest();
xhttp.open("GET", "visual.json");
xhttp.send();
xhttp.onreadystatechange = function (event) {
  //   console.log(event.target);

  if (event.target.readyState === XMLHttpRequest.DONE) {
    console.log("자료왔다!!");
    console.log(event.target.response);
    const result = JSON.parse(event.target.response);
    console.log(result);
  }
};

const visualRes = {};

// 출력을 시켜줄 문장을 만들자.
let visualHtml = "";

// total 만큼 반복하자
// for 는 반복을 하는데 true 인 경우에만 반복한다.
// for (let i = 1; i < 6; i++) {
//   let temp = `
//     <div class="swiper-slide">
//         <div class="v-slide-item">
//             <a href="${visualRes["visual_" + i].url}">
//                 <img src="${visualRes["visual_" + i].file}" alt="${
//     visualRes["visual_" + i].url
//   }" />
//             </a>
//         </div>
//     </div>
// `;
//   visualHtml += temp;
// }

console.log(visualHtml);
// 어디다가 자료를 출력할 것인지 지정
const visualSlide = document.querySelector(".visual-slide .swiper-wrapper");
visualSlide.innerHTML = visualHtml;

console.log(visualRes);

// `
// <div class="swiper-slide">
//     <!-- 실제 내용 배치 -->
//     <div class="v-slide-item">
//         <a href="#">
//             <img src="./images/v1.png" alt="" />
//         </a>
//     </div>
// </div>
// <div class="swiper-slide">
//     <div class="v-slide-item">
//         <a href="#">
//             <img src="./images/v2.jpg" alt="" />
//         </a>
//     </div>
// </div>
// <div class="swiper-slide">
//     <div class="v-slide-item">
//         <a href="#">
//             <img src="./images/v3.jpg" alt="" />
//         </a>
//     </div>
// </div>
// <div class="swiper-slide">
//     <div class="v-slide-item">
//         <a href="#">
//             <img src="./images/v4.jpg" alt="" />
//         </a>
//     </div>
// </div>
// <div class="swiper-slide">
//     <div class="v-slide-item">
//         <a href="#">
//             <img src="./images/v5.jpg" alt="" />
//         </a>
//     </div>
// </div>
// <div class="swiper-slide">
//     <div class="v-slide-item">
//         <a href="#">
//             <img src="./images/v6.png" alt="" />
//         </a>
//     </div>
// </div>
// `;
