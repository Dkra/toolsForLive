import React, { Component } from "react";
import moment from "moment";
import DeleteIcon from "react-icons/lib/md/remove-circle";
import NoBookmark from "react-icons/lib/fa/bookmark-o";
import Bookmarked from "react-icons/lib/fa/bookmark";

class HouseItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onClickImageWrap = (e, url) => {
    e.preventDefault();
    window.open(url, "_blank");
  };

  render() {
    const {
      item,
      onClickDeleteIcon,
      isProtected,
      isFilteredbyText,
      onClickAddProtectIcon,
      onClickDeleteProtectIcon
    } = this.props;

    return (
      <div
        className={`item-house ${isFilteredbyText ? "filtered-by-text" : ""}`}
      >
        <a
          onClick={e => {
            this.onClickImageWrap(
              e,
              `https://rent.591.com.tw/rent-detail-${item.houseid}.html`
            );
            onClickAddProtectIcon(e, item.id);
          }}
        >
          {!isProtected && (
            <NoBookmark
              className="protect-item not-protected"
              onClick={e => onClickAddProtectIcon(e, item.id)}
            />
          )}
          {isProtected && (
            <Bookmarked
              className="protect-item protected"
              onClick={e => onClickDeleteProtectIcon(e, item.id)}
            />
          )}
          <img src={`${item.cover}`} className="house-coverImg" alt="" />
          {!isProtected && (
            <DeleteIcon
              className="delete-icon"
              onClick={e => onClickDeleteIcon(e, item.id)}
            />
          )}
        </a>
        <span className="column-price">{item.price}</span>
        <span className="column-address">{item.address}</span>
        <span className="column-refreshtime">
          {moment(item.refreshtime * 1000).fromNow()}
        </span>
        <span className="column-views">瀏覽次數:{item.browsenum}</span>
        {/*
        <span>價錢: {item.price}</span>
      */}
      </div>
    );
  }
}

export default HouseItem;
