function ji_suan() {
    let jia_qian = document.getElementById("價錢");
    let shu_liang = document.getElementById("數量");
    let jie_guo = document.getElementById("結果");
    let t_c = /^[1-9][0-9]*(.[0-9]+)?$/;
    let t_c_e = /^[1-9][0-9]*,[0-9]+$/;
    let hui_da;
    let flag = false;
    if (jia_qian.value === "" || shu_liang.value === "")
        hui_da = "請輸入數據！";
    else if (((jia_qian.value.match(t_c) === null) && (jia_qian.value.match(t_c_e) === null)) || shu_liang.value.match(natural()) === null)
        hui_da = "數字寫錯了！";
    else if (jia_qian.value.match(t_c_e) === null) {
        flag = true;
        let f_1 = parseFloat(jia_qian.value);
        let f_2 = parseInt(shu_liang.value);
        hui_da = ("總費用" + f_1 * f_2 + "元！");
    } else
        hui_da = "請通過點號輸入價錢！";

    jie_guo.classList.add("text-" + ((flag) ? ("success") : ("danger")));
    jie_guo.classList.remove("text-" + ((!flag) ? ("success") : ("danger")));
    jie_guo.innerHTML = hui_da;
    return false;
}

function natural() {
    return /^[1-9][0-9]*$/;
}

function updatePrice() {
    let select = document.getElementsByName("貨物類別")[0];
    let price = 0;
    let prices = getPrices();
    let priceIndex = parseInt(select.value) - 1;
    if (priceIndex >= 0) {
        price = prices.prodTypes[priceIndex];
    }

    document.getElementById("單選框按鈕").style.display = (select.value == "2" ? "block" : "none");
    document.getElementById("複選框").style.display = (select.value == "3" ? "block" : "none");

    if (select.value == "2")
        document.getElementsByName("服裝類別").forEach(function (radio) {
            if (radio.checked) {
                let optionPrice = prices.prodOptions[radio.value];
                if (optionPrice !== undefined) {
                    price += optionPrice;
                }
            }
        });
    else if (select.value == "3")
        document.querySelectorAll("#複選框 input").forEach(function (checkbox) {
            if (checkbox.checked) {
                let propPrice = prices.prodProperty[checkbox.name];
                if (propPrice !== undefined) {
                    price += propPrice;
                }
            }
        });

    let shu_liang = document.getElementById("兩個數量");
    let ans;
    let flag = false;
    if (shu_liang.value === "")
        ans = "請輸入數據！";
    else if (shu_liang.value.match(natural ()) === null)
        ans = "數字寫錯了！";
    else {
        flag = true;
        let f = parseInt(shu_liang.value);
        ans = ("總費用" + f * price + "元！");
    }

    let cheng_ben = document.getElementById("貨物成本");
    cheng_ben.classList.add("text-" + ((flag) ? ("success") : ("danger")));
    cheng_ben.classList.remove("text-" + ((!flag) ? ("success") : ("danger")));
    cheng_ben.innerHTML = ans;
}

function getPrices() {
    return {
        prodTypes: [200, 400, 1000],
        prodOptions: {
            cheng_ren: 300,
        },
        prodProperty: {
            xin: 500,
        }
    };
}

window.addEventListener('DOMContentLoaded', function (event) {
    document.getElementById("按鈕").addEventListener("click", ji_suan);

    document.getElementById("兩個數量").addEventListener("input", updatePrice);

    document.getElementsByName("貨物類別")[0].addEventListener("change", updatePrice);

    document.getElementsByName("服裝類別").forEach(function (radio) {
        radio.addEventListener("change", updatePrice);
    });

    document.querySelectorAll("#複選框 input").forEach(function (checkbox) {
        checkbox.addEventListener("change", updatePrice);
    });

    updatePrice();
});

$(document).ready(function () {
    $(".multiple-items").slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        dots: true,
        autoplay: true,
        autoplaySpeed: 4000,
        responsive: [
            {
                breakpoint: 960,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    });
}); 
