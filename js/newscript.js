
class Currency {
   constructor(obj, dates) {
      this.name = obj.Cur_Name ?? 'Bitcoin'
      this.id = obj.Cur_ID ?? '01'
      this.abbr = obj.Cur_Abbreviation ?? `BTC`
      this.rate = obj.Cur_OfficialRate ?? obj.USD.last
      this.scale = obj.Cur_Scale ?? 1
      this.dates = dates

      this.#render()
      this.checkName()
      // this.getStatistics(this.stattisticUrl)

   }

   #render() {
      this.$elem = document.createElement('div')
      this.$elem.classList.add('currency__item')
      this.$elem.innerHTML = this.#getTemplate()
   }


   #getTemplate() {
      return `
         <button class="currency__body">
            <div class="currency__img">
               <img src="" alt="">
            </div>
            <div class="currency__content">
              <h4 class="currency__title">Валюта: за ${this.scale} ${this.name}</h4>
              <p class="currrency__text">Текущий курс:<span class="currency__rate">${this.rate}</span></p>
            </div>
         </button>
      `
   }

   get isNotBitcoin() {
      return this.name !== 'Bitcoin'
   }

   checkName() {
      if (this.isNotBitcoin) this.getStatistics()
   }

   async getStatistics() {
      let stattisticUrl = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${this.id}?startDate=${this.dates[0]}&endDate=${this.dates[1]}`
      const response = await fetch(stattisticUrl)
      this.statistics = await response.json()
   }
}

function calcDatesForStat() {
   const firstStatDay = new Date()
   const today = new Date()
   firstStatDay.setDate(today.getDate() - 35)
   return [firstStatDay.toJSON().slice(0, 10), today.toJSON().slice(0, 10)]
}

function dataRequests(linksList, statDates) {
   const list = []
   linksList.forEach(async link => {
      const response = await fetch(link)
      const data = await response.json()
      const cur = new Currency(data, statDates)
      list.push(cur)
   })
   return list
}



function init() {
   const $currensiesList = document.querySelector('#currenciesList')

   const imageUrlList = [
      { name: 'USD', url: 'img/united-states.svg' },
      { name: 'EUR', url: 'img/european-union.svg' },
      { name: 'TRY', url: 'img/turkey.svg' },
      { name: 'CHF', url: 'img/switzerland.svg' },
      { name: 'RUB', url: 'img/russia.svg' },
      { name: 'THB', url: 'img/thailand.svg' },
      { name: 'USD', url: 'img/united-states.svg' },
   ]


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
      'https://blockchain.info/ticker',                 //? Bitcoin
   ];
   const datesForStatat = calcDatesForStat()
   const currenciesList = dataRequests(URLRatesList, datesForStatat)
   console.log(currenciesList);
}

document.addEventListener('DOMContentLoaded', init)
