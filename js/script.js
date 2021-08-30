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
  const component = `<a class="waves-effect waves-light grey darken-3 btn-large currency">${curInfo.Cur_Scale} ${curInfo.Cur_Abbreviation} = ${curInfo.Cur_OfficialRate} BYN</a>`
  $curList.insertAdjacentHTML("beforeend", component)
}
const fetchData = async (address) => {
  const response = await fetch(address)
  const data = await response.json()
  getTemplate(data)
}

URLRatesList.forEach(src => {
  fetchData(src)
})
