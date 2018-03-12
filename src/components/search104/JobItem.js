import React, { Component } from 'react'
import moment from 'moment'
import DeleteIcon from 'react-icons/lib/md/remove-circle'
import Bookmark from 'react-icons/lib/fa/bookmark'
import store from 'store2'

class JobItem extends Component {
	constructor(props) {
		super(props)
		this.state = { isHovered: false }
	}

	onClickImageWrap = (e, url) => {
		e.preventDefault()
		window.open(url, '_blank')
	}
	onClickJobitem = (e, url) => {
		window.open(url, '_blank')
	}

	onClickBookmark = (e, jobNo) => {
		const { onClickBookmark, area } = this.props
		e.preventDefault()
		e.stopPropagation()
		console.log('jobNo:', jobNo)
		onClickBookmark(jobNo, area)
	}

	onHoverJobItem = () => {
		this.setState({
			isHovered: !this.state.isHovered
		})
	}

	onHoveroutJobItem = () => {
		this.setState({
			isHovered: !this.state.isHovered
		})
	}

	render() {
		const {
			item,
			onClickDeleteIcon,
			active,
			onClickBookmark,
			area,
			bookmark
		} = this.props
		const { isHovered } = this.state
		return (
			<div
				className={`item-job ${bookmark === item.jobNo ? 'isMarked' : ''}`}
				onMouseEnter={this.onHoverJobItem}
				onMouseLeave={this.onHoveroutJobItem}
				onClick={e => this.onClickJobitem(e, item.link.job)}
				data-jobNo={item.jobNo}
			>
				<div className="name">{item.jobName}</div>
				<div className="salary">{item.salaryDesc.replace('月薪', '')}</div>
				<div className="company" onClick={e => e.stopPropagation()}>
					{item.custName.replace('股份有限公司', '')}
				</div>
				<div className="bookmark"> </div>
				<Bookmark
					className={`add-bookmark ${isHovered ? 'active' : ''}`}
					onClick={e => this.onClickBookmark(e, item.jobNo)}
				/>
			</div>
		)
	}
}

export default JobItem
