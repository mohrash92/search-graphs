import React, {Component} from 'react';
import axios from 'axios';

const plotly = require('plotly')("mo_at_bbc", "yH5r6N3saEpFqYzbMPwT");

class App extends Component {

  async componentDidMount() {
    try {
      const noResultsUrl = 'https://apirest.atinternet-solutions.com/data/v2/json/getData?&columns={d_pub_variant,m_pub_impressions}&sort={-m_pub_impressions}&filter={m_pub_impressions:{$gt:%270%27},d_pub_creative:{$eq:%27No%20results%27},d_pub_campaign:{$eq:%27se-searchbox-message%27}}&space={s:598273}&period={R:{M:%270%27}}&max-results=10&apikey=0c742bdd-4cce-423a-b7f0-eeb42d7eedf1'
      const res = await fetch(noResultsUrl)
      const json = await res.json();
      console.log('json=', json)

      const { DataFeed: [{Rows}] } = json;

      const xData = Rows.map((row) => row.d_pub_variant)
      const yData = Rows.map((row) => row.m_pub_impressions)

      const coordinateData = [{x: xData, y: yData, type: 'bar'}];
      const layout = {fileopt: "overwrite", filename: "simple-node-example"};

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
              id="igraph"
              scrolling="no"
              src="https://chart-studio.plotly.com/~mo_at_bbc/0/#/"
              height="525"
              x="gdpPercap"
              y="lifeExp"
              width="100%">
          </iframe>
        </div>
    )
  }
}

export default App;
