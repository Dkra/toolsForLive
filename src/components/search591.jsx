import React, { Component } from 'react'

import ax from 'axios'
import ThList from 'react-icons/lib/ti/th-list'
import ThSmall from 'react-icons/lib/ti/th-small'
import HouseItem from './search591/HouseItem'
import ContentLoader from 'react-content-loader'
import { Select } from 'antd'
const Option = Select.Option

class search591 extends Component {
	constructor(props) {
		super(props)
		this.state = {
			sorting: 'refreshtime', // refreshtime, browsenum,
			listView: 'detail', // detail, icon
			houseData: [],
			blackList: []
		}
	}
	componentDidMount() {
		const url = 'http://localhost:8888/api/search591'
		this.fetchBlackList()
		this.fetchHouseData(url)
		setInterval(this.fetchHouseData, 60000)
	}
	fetchBlackList = () => {
		const url = 'http://localhost:8888/api/search591/black-list'
		ax
			.get(url)
			.then(response => {
				this.setState({
					blackList: response.data
				})
			})
			.catch(err => {
				console.log('err:', err)
			})
	}
	fetchHouseData = () => {
		const url = 'http://localhost:8888/api/search591'
		ax
			.get(url)
			.then(response => {
				this.setState({
					houseData: response.data
				})
			})
			.catch(error => {
				console.log('error:', error)
			})
	}

	onSelectChange = value => {
		this.setState({
			sorting: value
		})
	}

	onChangeListView = listView => {
		this.setState({
			listView
		})
	}

	onClickDeleteIcon = (e, id) => {
		const url = 'http://localhost:8888/api/search591/black-list/add'
		e.stopPropagation()
		ax
			.post(url, {
				id: id
			})
			.then(response => {
				console.log('response:', response)
			})
			.catch(error => {
				console.log('error:', error)
			})

		this.setState({
			blackList: [...this.state.blackList, id]
		})
	}
	render() {
		const { listView, blackList } = this.state
		return (
			<div>
				<div className="toolbar-wrap">
					<Select defaultValue="refreshtime" onChange={this.onSelectChange}>
						<Option value="refreshtime">Refresh Time</Option>
						<Option value="browsenum">Most Views</Option>
					</Select>
					<div className="view-option">
						<ThList
							className={`${listView === 'detail' ? 'active' : ''}`}
							onClick={() => this.onChangeListView('detail')}
						/>
						<ThSmall
							className={`${listView === 'icon' ? 'active' : ''}`}
							onClick={() => this.onChangeListView('icon')}
						/>
					</div>
				</div>

				<section
					className={`item-house-wrap ${
						this.state.listView === 'icon' ? 'sort-by-refresh' : ''
					}`}
				>
					{this.state.houseData.length === 0 ? (
						<ContentLoader className="loading-img">
							<rect x="0" y="0" rx="5" ry="5" width="100%" height="10" />
							<rect x="0" y="40" rx="5" ry="5" width="100%" height="10" />
							<rect x="0" y="80" rx="5" ry="5" width="100%" height="10" />
							<rect x="0" y="120" rx="5" ry="5" width="100%" height="10" />
						</ContentLoader>
					) : (
						this.state.houseData
							.filter(item => !this.state.blackList.includes(item.id))
							.sort((a, b) => b[this.state.sorting] - a[this.state.sorting])
							.map((item, idx) => {
								return (
									<HouseItem
										className={`item-house`}
										key={`house-${idx}`}
										item={item}
										onClickDeleteIcon={this.onClickDeleteIcon}
									/>
								)
							})
					)}
				</section>
			</div>
		)
	}
}

export default search591
