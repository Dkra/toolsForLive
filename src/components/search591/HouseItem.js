import React, { Component } from 'react'
import moment from 'moment'

class HouseItem extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { key, item } = this.props
    return (
      <div className={`item-house`} key={key}>
        <a
          href={`https://rent.591.com.tw/rent-detail-${item.houseid}.html`}
          target="_blank"
        >
          <img src={`${item.cover}`} className="house-coverImg" alt="" />
        </a>

        <span className="column-address">
          {item.address}
        </span>
        <span className="column-refreshtime">
          {moment(item.refreshtime * 1000).fromNow()}
        </span>
        <span className="column-views">
          瀏覽次數:{item.browsenum}
        </span>
        {/*
        <span>價錢: {item.price}</span>
      */}
      </div>
    )
  }
}

export default HouseItem
