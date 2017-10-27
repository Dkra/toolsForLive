import React, { Component } from 'react'
import moment from 'moment'
import ax from 'axios'

class search591 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sorting: 'refreshtime', // refreshtime,
      houseData: [],
    }
  }
  componentDidMount() {
    const url = 'http://localhost:8888/api/search591'
    ax
      .get(url)
      .then(response => {
        this.setState({
          houseData: response.data,
        })
      })
      .catch(error => {
        console.log('error:', error)
      })
  }

  onSelectChange = value => {
    this.setState({
      sorting: value,
    })
  }

  render() {
    return (
      <div>
        <input type="text" className="url" placeholder="search url" />
        <select onChange={e => this.onSelectChange(e.target.value)}>
          <option value="refreshtime">Refresh Time</option>
          <option value="browsenum">Most Views</option>
        </select>
        <button>submit</button>

        <section>
          {this.state.houseData
            .sort((a, b) => b[this.state.sorting] - a[this.state.sorting])
            .map((item, idx) => {
              return (
                <div className="item-house" key={`house-${idx}`}>
                  <a
                    href={`https://rent.591.com.tw/rent-detail-${item.houseid}.html`}
                    target="_blank"
                  >
                    <img src={`${item.cover}`} alt="" />
                  </a>

                  <span>
                    {item.address}
                  </span>
                  <span>
                    refreshtime:{moment(item.refreshtime * 1000).fromNow()}
                  </span>
                  <span>
                    瀏覽次數:{item.browsenum}
                  </span>
                </div>
              )
            })}
        </section>
      </div>
    )
  }
}

export default search591
