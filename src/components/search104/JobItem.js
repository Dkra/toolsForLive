import React, { Component } from 'react'
import moment from 'moment'
import DeleteIcon from 'react-icons/lib/md/remove-circle'

class JobItem extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	onClickImageWrap = (e, url) => {
		e.preventDefault()
		window.open(url, '_blank')
	}
	onClickJobitem = (e, url) => {
		window.open(url, '_blank')
	}
	render() {
		const { item, onClickDeleteIcon } = this.props
		return (
			<div
				className={`item-job`}
				onClick={e => this.onClickJobitem(e, item.link.job)}
			>
				{/* <a
					onClick={e =>
						this.onClickImageWrap(
							e,
							`https://rent.591.com.tw/rent-detail-${item.houseid}.html`
						)
					}
				>
					<img src={`${item.cover}`} className="house-coverImg" alt="" />
					<DeleteIcon
						className="delete-icon"
						onClick={e => onClickDeleteIcon(e, item.id)}
					/>
				</a> */}
				<div className="name">{item.jobName}</div>
				<div className="salary">{item.salaryDesc.replace('月薪', '')}</div>
				<div className="company">
					{item.custName.replace('股份有限公司', '')}
				</div>
			</div>
		)
	}
}

export default JobItem
