const spinId = document.getElementById("spinId");
const parentspin = spinId.parentNode;
const time = document.getElementById("time");
const card = document.getElementById("card");
const btn = document.querySelector(".btn");

// kedi resimlerinin gelmesi beklenirken ekranda gösterilmesini istediğimiz spin in fonksiyonu
const spingoster = () => {
  parentspin.appendChild(spinId);
};

//*********************** */

//zamanlayıcı, api den veri çekilirken yapılacaklar

setTimeout(() => {
  spinId.remove();
  apicagir();

  btn.addEventListener("click", () => {
    card.innerHTML = "";
    spingoster();

    // Butona tıklanınca 2 saniye sonra apicagir fonksiyonu çalışır
    setTimeout(() => {
      apicagir();
    }, 2000);
  });
}, 3000);

//tarih saat in ekranda gösterilmesi
setInterval(() => {
  time.textContent = `${new Date().toLocaleString()}`;
}, 500);

const kedigoster = (a) => {
  a.forEach((item) => {
    card.innerHTML += `<div class="col-12 col-sm-6 col-lg-4">
        <div style="height:250px;">
          <img src="${item.url}" class=" resimler img-thumbnail w-100 h-100" alt="...">
        </div>
  </div>`;
  });
};
// hata mesajı veya resmi için tanımlama ve fonks.
const urlm = "./img/error.gif";
let resim = document.createElement("img");
resim.src = `${urlm}`;
resim.classList.add("hataresmi");

const hatagoster = () => {
  resim.src = "./img/error.gif";
  card.appendChild(resim);
  resim.classList.add("block");
};
//***************** */

// fetch-then-catch blokları
const apicagir = () => {
  spingoster();
  fetch("https://api.thecatapi.com/v1/images/search?limit=10")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      spinId.remove();
      kedigoster(data);
    })
    .catch(() => {
      hatagoster();
      spinId.remove();
    });
};
