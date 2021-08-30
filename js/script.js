const el = document.querySelector('.tabs')
const $curList = document.querySelector('#curList')
var instance = M.Tabs.init(el);


// 449 - гривна
const URLRatesList = [
  'https://www.nbrb.by/api/exrates/rates/451',      //? Евро
  'https://www.nbrb.by/api/exrates/rates/431',      //? Доллар США
  'https://www.nbrb.by/api/exrates/rates/456',      //? Российский рубль
  'https://www.nbrb.by/api/exrates/rates/468',      //? Тайский бат
  'https://www.nbrb.by/api/exrates/rates/460',      //? Турецкая лира
  'https://www.nbrb.by/api/exrates/rates/426',      //? Швейцарский франк
  'https://www.nbrb.by/api/exrates/rates/429',      //? Фунт стерлингов
  'https://www.nbrb.by/api/exrates/rates/449',      //? Гривна
  // 'https://blockchain.info/ticker',                 //? Bitcoin
];
const getTemplate = (curInfo) => {
  const currency = document.createElement('div')
  currency.className = 'waves-effect waves-light currency card grey darken-3'
  const currencyInnerHTML = `
  <div class="currency__body">
    <div class="currency__img ">
      <img src="img/turkey.svg" alt="флаг">
    </div>
    <div class="currency__text ">
      <span class="currency__title card-title">Валюта: ${curInfo.Cur_Scale} ${curInfo.Cur_Abbreviation}</span>
      <span class="currency__caption">Оффициальный курс: ${curInfo.Cur_OfficialRate} BYN</span>
    </div>
  </div>
  <div class="currency__chart " id="chart">
    ГРАФИК
  </div>
  `
  currency.insertAdjacentHTML("afterbegin", currencyInnerHTML)

  currency.addEventListener('click', (e) => {
    currency.classList.toggle('showChart')
  })

  $curList.insertAdjacentElement("beforeend", currency)
}
const fetchData = async (address) => {
  const response = await fetch(address)
  const data = await response.json()
  getTemplate(data)
}



const init = () => {
  const listCurrencies = document.querySelectorAll('.currency')
  for (const item of listCurrencies) {
    console.log(item);
  }
}

document.addEventListener('DOMContentLoaded', () => {

  init()
  URLRatesList.forEach(src => {
    fetchData(src)
  })
})
