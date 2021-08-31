


// 449 - гривна
const URLRatesList = [
  'https://www.nbrb.by/api/exrates/rates/451',      //? Евро
  'https://www.nbrb.by/api/exrates/rates/431',      //? Доллар США
  'https://www.nbrb.by/api/exrates/rates/456',      //? Российский рубль
  // 'https://www.nbrb.by/api/exrates/rates/468',      //? Тайский бат
  'https://www.nbrb.by/api/exrates/rates/460',      //? Турецкая лира
  'https://www.nbrb.by/api/exrates/rates/426',      //? Швейцарский франк
  'https://www.nbrb.by/api/exrates/rates/429',      //? Фунт стерлингов
  'https://www.nbrb.by/api/exrates/rates/449',      //? Гривна
  // 'https://blockchain.info/ticker',                 //? Bitcoin
];

const getDates = () => {
  const today = new Date()
  const firstStatDay = new Date()
  firstStatDay.setDate(today.getDate() - 90)

  return [`${firstStatDay.toJSON().slice(0, 10)}`, `${today.toJSON().slice(0, 10)}`]
}
// console.log(getDates())


// const labels = [
//   'January',
//   'February',
//   'March',
//   'April',
//   'May',
//   'June',
// ];
// const data = {
//   labels: labels,
//   datasets: [{
//     label: 'My First dataset',
//     backgroundColor: '#8c9eff',
//     borderColor: '#536dfe',
//     data: [0, 10, 5, 2, 20, 30, 45],
//     fill: true,
//   }]
// };
// const config = {
//   type: 'line',
//   data: data,
//   options: {}
// };
// var myChart = new Chart(
//   document.getElementById('myChart'),
//   config
// );

const getTemplate = (curInfo, parent, period) => {

  const startDate = period[0]
  const endDate = period[1]
  const statLink = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${curInfo.Cur_ID}?startDate=${startDate}&endDate=${endDate}`

  const currency = document.createElement('div')
  currency.className = 'waves-effect waves-light currency card grey darken-3'

  const currencyInnerHTML = `
  <div class="currency__body">
    <div class="currency__img ">
      <img src="img/${curInfo.Cur_Abbreviation}.svg" alt="${curInfo.Cur_Name}">
    </div>
    <div class="currency__text ">
      <span class="currency__title card-title">Валюта: ${curInfo.Cur_Scale} ${curInfo.Cur_Abbreviation}</span>
      <span class="currency__caption">Оффициальный курс: ${curInfo.Cur_OfficialRate} BYN</span>
    </div>
  </div>
  <div class="currency__chart " >
    ГРАФИК
    <canvas id="chart${curInfo.Cur_Abbreviation}"></canvas>
  </div>
  `
  currency.insertAdjacentHTML("afterbegin", currencyInnerHTML)


  // let statistics
  let labels
  let data
  let isOpen = false

  currency.addEventListener('click', async (e) => {
    if (isOpen) {
      // * здесь график открыт. Нужно его закрыть
      currency.classList.remove('showChart')
      isOpen = false
    } else {

      // * Тут график закрыт. Мы проверяем, есть ли данные для график

      if (!data) {

        // * если нет, то мы делаем запрос и получаем их

        const statistics = await fetchData(statLink)
        data = await statistics.map(item => item.Cur_OfficialRate)
        labels = statistics.map(item => item.Date.slice(5, 10))

        // console.log(data);
        // console.log(labels);

        // * тут работаем с данными 
        // const ChartLabels = labels;
        const chartData = {
          labels: labels,
          datasets: [{
            label: `${curInfo.Cur_Abbreviation} dynamics`,
            backgroundColor: '#8c9eff',
            borderColor: '#536dfe',
            data: data,
            fill: true,
          }]
        };
        const config = {
          type: 'line',
          data: chartData,
          options: {
            radius: 2
          }
        };
        var myChart = new Chart(
          document.getElementById(`chart${curInfo.Cur_Abbreviation}`),
          config
        );
      } else {

        //* если есть, то... ничего. Просто работаем с ними

        console.log(`we have statistics here`);
      }


      // myChart.render()
      currency.classList.add('showChart')
      isOpen = true
    }
  })

  parent.insertAdjacentElement("beforeend", currency)
}


const fetchData = async (address) => {
  const response = await fetch(address)
  const data = await response.json()
  return data
}

const init = () => {

  const dates = getDates()

  const el = document.querySelector('.tabs')
  const $curList = document.querySelector('#curList')
  var instance = M.Tabs.init(el);
  URLRatesList.forEach(async src => {
    const data = await fetchData(src)
    getTemplate(data, $curList, dates)
  })
}

document.addEventListener('DOMContentLoaded', () => init())
