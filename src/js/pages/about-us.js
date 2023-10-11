const AboutUs = {
  async init() {
    await this._initialData();
  },

  async _initialData() {
    const fetchPortfolio = await fetch('/data/PORTFOLIO.json');
    const portfolioResponse = await fetchPortfolio.json();

    this._portfolios = portfolioResponse.listPortfolio;
    this._populatePortfolioDataToCard(this._portfolios);
  },

  _populatePortfolioDataToCard(portfolios = null) {
    if (!Array.isArray(portfolios)) {
      throw new Error(`Parameter stories should be an array.  The value is ${portfolios}`);
    }

    const myPortfolio = document.getElementById('my-portfolios');
    myPortfolio.innerHTML = '';

    portfolios.forEach((item) => {
      myPortfolio.innerHTML += this._templateCardPortFolio(item);
    });
  },

  _templateCardPortFolio(portFolio) {
    return `
      <div class='col-sm text-center'>
        <a href='${portFolio.detailUrl}' target='_blank'>
          <img src='${portFolio.photoUrl}' class='img-thumbnail bottom-shadow' alt='portfolio-picture'>
        </a>
        <p><small class='text-body-secondary'> ${portFolio.appName}</small></p>
      </div> 
    `;
  },
};

export default AboutUs;