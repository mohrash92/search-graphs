import React, {Component} from 'react';
const plotly = require('plotly')('mo_at_bbc', process.env.REACT_APP_PLOTLY_API_KEY)

const getCoordinateData = async (noResultsUrl) => {
    const res = await fetch(noResultsUrl)
    const json = await res.json();

    const {DataFeed: [{Rows}]} = json;

    Rows.shift();
    const xData = Rows.map((row) =>  {
      const s = row.d_pub_variant.split('QRY=')[1];
      const n = s.indexOf('~');
      const query = s.substring(0, n != -1 ? n : s.length)

      if (query && !query.includes(";")) {
        return query;
      }
    })

  const yData = Rows.map((row) => row.m_pub_clicks)
    if (!res.ok) {
      throw Error(res.statusText);
    }

    return {x: xData, y: yData, type: 'bar', width: 0.4};
}

const getLayout = (xAxisTitle, yAxisTitle) => {
  return {
    fileopt: "overwrite",
    filename: "simple-node-example",
    layout: {
      xaxis: {
        title: xAxisTitle,

      },
      yaxis: {
        title: yAxisTitle
      }
    }
  };
}

const createGraph = (coordinateData, layout) => {
  console.log("coordinateData", coordinateData);s
  plotly.plot(coordinateData, layout, function (err, msg) {
    if (err) return console.log(err);
    console.log(msg);
  });
}
class App extends Component {

  async componentDidMount() {
    try {
      // const noResultsUrl = `https://apirest.atinternet-solutions.com/data/v2/json/getData?&columns={d_pub_variant,m_pub_impressions}&sort={-m_pub_impressions}&filter={m_pub_impressions:{$gt:%270%27},d_pub_creative:{$eq:%27No%20results%27},d_pub_campaign:{$eq:%27se-searchbox-message%27}}&space={s:598273}&period={R:{M:%270%27}}&max-results=10&apikey=${process.env.REACT_APP_ATI_KEY}`
      // const noResultsCoordinateData = await getCoordinateData(noResultsUrl);
      // noResultsCoordinateData.name = 'All on SERP';

      const zeroToTwelveUrl = `https://apirest.atinternet-solutions.com/data/v2/json/getData?&columns=%7Bm_pub_clicks,d_pub_creative,d_pub_variant%7D&sort=%7B-m_pub_clicks%7D&filter=%7Bm_pub_clicks:%7B$gte:'1'%7D,d_pub_creative:%7B$lk:'clear-icon'%7D,$AND:%7Bd_pub_variant:%7B$lk:'SEG='%7D,d_pub_variant:%7B$lk:'0-12'%7D%7D%7D&space=%7Bs:598273%7D&period=%7BR:%7BM:'-1'%7D%7D&max-results=10&page-num=1&apikey=${process.env.REACT_APP_ATI_KEY}`
      const zeroToTwelveUrlCoordinateData = await getCoordinateData(zeroToTwelveUrl);
      zeroToTwelveUrlCoordinateData.name = '0-12 Age Band'

      // The segmentation data has been tweaked and no longer exists
      // const eighteenToTwentyFour = `https://apirest.atinternet-solutions.com/data/v2/json/getData?&columns=%7Bm_pub_clicks,d_pub_creative,d_pub_variant%7D&sort=%7B-m_pub_clicks%7D&filter=%7Bm_pub_clicks:%7B$gte:'1'%7D,d_pub_creative:%7B$lk:'clear-icon'%7D,$AND:%7Bd_pub_variant:%7B$lk:'SEG='%7D,d_pub_variant:%7B$lk:'18-24'%7D%7D%7D&space=%7Bs:598273%7D&period=%7BR:%7BM:'-1'%7D%7D&max-results=10&page-num=1&apikey=0c742bdd-4cce-423a-b7f0-eeb42d7eedf1`
      // const eighteenToTwentyFourCoordinateData = await getCoordinateData(eighteenToTwentyFour);
      // eighteenToTwentyFourCoordinateData.name = '18-24 Age Band'
      //
      // const thirtyfiveToFourtyFour = `https://apirest.atinternet-solutions.com/data/v2/json/getData?&columns=%7Bm_pub_clicks,d_pub_creative,d_pub_variant%7D&sort=%7B-m_pub_clicks%7D&filter=%7Bm_pub_clicks:%7B$gte:'1'%7D,d_pub_creative:%7B$lk:'clear-icon'%7D,$AND:%7Bd_pub_variant:%7B$lk:'SEG='%7D,d_pub_variant:%7B$lk:'35-44'%7D%7D%7D&space=%7Bs:598273%7D&period=%7BR:%7BM:'-1'%7D%7D&max-results=10&page-num=1&apikey=${process.env.REACT_APP_ATI_KEY}`
      // const thirtyfiveToFourtyFourCoordinateData = await getCoordinateData(thirtyfiveToFourtyFour);
      // thirtyfiveToFourtyFourCoordinateData.name = '35-44 Age Band'
      //
      // const sixtyfiveToSeventyFour = `https://apirest.atinternet-solutions.com/data/v2/json/getData?&columns=%7Bm_pub_clicks,d_pub_creative,d_pub_variant%7D&sort=%7B-m_pub_clicks%7D&filter=%7Bm_pub_clicks:%7B$gte:'1'%7D,d_pub_creative:%7B$lk:'clear-icon'%7D,$AND:%7Bd_pub_variant:%7B$lk:'SEG='%7D,d_pub_variant:%7B$lk:'65-74'%7D%7D%7D&space=%7Bs:598273%7D&period=%7BR:%7BM:'-1'%7D%7D&max-results=10&page-num=1&apikey=${process.env.REACT_APP_ATI_KEY}`
      // const sixtyfiveToSeventyFourFourCoordinateData = await getCoordinateData(sixtyfiveToSeventyFour);
      // sixtyfiveToSeventyFourFourCoordinateData.name = '65-74 Age Band'

      const layout = getLayout('Query','Publisher Clicks')
      const data = [zeroToTwelveUrlCoordinateData];

      await createGraph(data, layout)

    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
        <div>
          <h1>No results</h1>
          <iframe
              title="No results"
              id="igraph"
              scrolling="no"
              src="https://chart-studio.plotly.com/~mo_at_bbc/0/#/"
              height="900"
              width="100%">
          </iframe>

        </div>
    )
  }
}

export default App;
