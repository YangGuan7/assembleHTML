window.addEventListener("load", function () {
  var img_index = 0;
  var lis_1 = document.querySelectorAll("#indexCarouselImgs li");
  var lis_2 = document.querySelectorAll("#btns li");
  var left_btn = document.querySelector(".left_btn");
  var right_btn = document.querySelector(".right_btn");
  var timeId;

  function clear_img() {
    lis_1.forEach(function (ele) {
      ele.className = "unactive";
    });
  }

  function clear_btn() {
    lis_2.forEach(function (ele) {
      ele.className = "btn_unat";
    });
  }

  function changePicture1() {
    img_index++;
    if (img_index > 2) {
      img_index = 0;
    }
    clear_img();
    clear_btn();
    lis_1[img_index].className = "active";
    lis_2[img_index].className = "btn_at";
  }

  function changePicture2() {
    img_index--;
    if (img_index < 0) {
      img_index = 2;
    }
    clear_img();
    clear_btn();
    lis_1[img_index].className = "active";
    lis_2[img_index].className = "btn_at";
  }

  timeId = setInterval(changePicture1, 5000);
  function stop() {
    clearInterval(timeId);
  }

  function start() {
    timeId = setInterval(changePicture1, 5000);
  }

  lis_2.forEach((ele, index) => {
    ele.onclick = function () {
      stop();
      clear_btn();
      clear_img();
      lis_1[index].className = "active";
      lis_2[index].className = "btn_at";
      img_index = index;
    };
  });

  left_btn.onclick = function () {
    stop();
    changePicture2();
  };

  right_btn.onclick = function () {
    stop();
    changePicture1();
  };

  //長時間停留會有BUG(圖片會快速移動),所以要加入監聽
  window.addEventListener(
    "blur",
    () => {
      stop();
      console.log("終止監聽");
    },
    false
  );

  window.addEventListener(
    "focus",
    () => {
      start();
      console.log("開始監聽");
    },
    false
  );
});
