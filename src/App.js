import React, {Component} from 'react';
const plotly = require('plotly')(process.env.REACT_APP_PLOTLY_USERNAME, process.env.REACT_APP_PLOTLY_API_KEY)

class App extends Component {

  async componentDidMount() {
    try {
      const noResultsUrl = `https://apirest.atinternet-solutions.com/data/v2/json/getData?&columns={d_pub_variant,m_pub_impressions}&sort={-m_pub_impressions}&filter={m_pub_impressions:{$gt:%270%27},d_pub_creative:{$eq:%27No%20results%27},d_pub_campaign:{$eq:%27se-searchbox-message%27}}&space={s:598273}&period={R:{M:%270%27}}&max-results=10&apikey=${process.env.REACT_APP_ATI_KEY}`

      const res = await fetch(noResultsUrl)
      const json = await res.json();

      const { DataFeed: [{Rows}] } = json;

      const xData = Rows.map((row) => row.d_pub_variant)
      const yData = Rows.map((row) => row.m_pub_impressions)

      const coordinateData = [{x: xData, y: yData, type: 'bar'}];
      const layout = {
        fileopt: "overwrite",
        filename: "simple-node-example",
        layout: {
          xaxis: {
            title: "Queries",

          },
          yaxis: {
            title: "Publisher Impressions"
          }
        }
      };

      plotly.plot(coordinateData, layout, function (err, msg) {
        if (err) return console.log(err);
        console.log(msg);
      });
      if (!res.ok) {
        throw Error(res.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
        <div>
          <iframe
              title="No results"
              id="igraph"
              scrolling="no"
              src="https://chart-studio.plotly.com/~mo_at_bbc/0/#/"
              height="525"
              width="100%">
          </iframe>
        </div>
    )
  }
}

export default App;
