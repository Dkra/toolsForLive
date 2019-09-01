import React, { Component } from 'react'
import ax from 'axios'
import ThList from 'react-icons/lib/ti/th-list'
import ThSmall from 'react-icons/lib/ti/th-small'
import HouseItem from './search591/HouseItem'
import ContentLoader from 'react-content-loader'
import { Select, Input, Button } from 'antd'
import store from 'store2'
const Option = Select.Option

class search591 extends Component {
	constructor(props) {
		super(props)
		this.state = {
			sorting: 'price', // refreshtime, browsenum, price
			listView: 'icon', // detail, icon
			filteredText: store.get('filteredText') || '',
			houseData: [],
			blackList: new Set(),
			protectList: new Set(),
			priceLow: 17,
			priceHigh: 18
		}
	}
	
	componentDidMount() {
		const url = 'http://localhost:8888/api/search591'
		this.fetchBlackList()
		this.fetchProtectList()
		this.fetchHouseData(url)
	}

	onChangeCompFilter = e => {
		const text = e.target.value
		store.set('filteredText', text)
		this.setState({ filteredText: text })
	}

	fetchBlackList = () => {
		const url = 'http://localhost:8888/api/search591/black-list'
		ax.get(url)
			.then(response => {
				this.setState({
					blackList: new Set(Object.keys(response.data))
				})
			})
			.catch(err => {
				console.log('err:', err)
			})
	}

	fetchProtectList = () => {
		const url = 'http://localhost:8888/api/search591/protect-list'
		ax.get(url)
			.then(response => {
				this.setState({
					protectList: new Set(Object.keys(response.data))
				})
			})
			.catch(err => {
				console.log('err:', err)
			})
	}

	// TODO: add to protect list, remove from protect list
	onClickAddProtectIcon = (e, id) => {
		const url = 'http://localhost:8888/api/search591/protect-list'
		e.stopPropagation()
		ax.post(url, {
			id: id
		})
			.then(response => {
				console.log('response:', response)
				this.fetchProtectList()
			})
			.catch(error => {
				console.log('error:', error)
			})
	}

	onClickDeleteProtectIcon = (e, id) => {
		const url = 'http://localhost:8888/api/search591/protect-list/delete'
		e.stopPropagation()
		ax.post(url, {
			id: id
		})
			.then(response => {
				console.log('response:', response)
				this.fetchProtectList()
			})
			.catch(error => {
				console.log('error:', error)
			})
	}

	fetchHouseData = ({ reset } = {}) => {
		const url = 'http://localhost:8888/api/search591'
		reset ? this.setState({ houseData: [] }) : null
		ax.get(url, {
			params: {
				priceLow: this.state.priceLow * 1000,
				priceHigh: this.state.priceHigh * 1000
			}
		})
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
		ax.post(url, {
			id: id
		})
			.then(response => {
				console.log('response:', response)
			})
			.catch(error => {
				console.log('error:', error)
			})

		const nextSet = new Set(this.state.blackList)
		nextSet.add(id+'')
		this.setState({
			blackList: nextSet
		})
	}

	onClickDeleteAllNotProtected = (e) => {
		e.stopPropagation()
		const { houseData,protectList } = this.state
		const url = 'http://localhost:8888/api/search591/black-list/deleteAllNotProtected'
		const allIds = houseData.map(item => item.id+'')
		const idsWithoutProtected = allIds.filter(id => !protectList.has(id))
		ax.post(url, {
			ids: idsWithoutProtected
		})
			.then(response => {
				console.log('response:', response)
				this.fetchBlackList()
			})
			.catch(error => {
				console.log('error:', error)
			})

		const nextBlackListSet = new Set(this.state.blackList)
		idsWithoutProtected.forEach(id => nextBlackListSet.add(id+''))
		this.setState({
			blackList: nextBlackListSet
		})
	}

	priceToNumber = str => {
		const num = parseInt(str.replace(',', ''))
		return num
	}

	render() {
		const {
			listView,
			blackList,
			priceHigh,
			priceLow,
			filteredText
		} = this.state

		// const filteredTextArr = filteredText
		// 	.split(',')
		// 	.map(comp => comp.trim())
		// 	// not empty string and company name should at least two character
		// 	.filter(comp => comp && comp.length >= 2)

		return (
			<div>
				<div className="toolbar-wrap">
					<Input
						defaultValue={filteredText}
						className="input-filter"
						placeholder="Filter text e.g: A, B"
						onChange={e => this.onChangeCompFilter(e)}
						title="at least two character"
					/>
					<Input
						style={{ width: 100 }}
						value={priceLow}
						placeholder="Price Low"
						onChange={e => this.setState({ priceLow: e.target.value })}
					/>~
					<Input
						style={{ width: 100, marginRight: 10 }}
						value={priceHigh}
						placeholder="Price High"
						onChange={e => this.setState({ priceHigh: e.target.value })}
						onKeyDown={e =>
							13 == e.keyCode ? this.fetchHouseData({ reset: true }) : null
						}
					/>
					<Select
						defaultValue={this.state.sorting}
						onChange={this.onSelectChange}
					>
						<Option value="refreshtime">Refresh Time</Option>
						<Option value="browsenum">Most Views</Option>
						<Option value="price">Most Expensive</Option>
					</Select>
					<Button
						style={{ marginRight: 15 }}
						onClick={() => this.fetchHouseData({ reset: true })}
					>
						送出
					</Button>
					<Button
						style={{ marginRight: 15 }}
						onClick={this.onClickDeleteAllNotProtected}
					>
						刪除全部 (除了Protected)
					</Button>
					
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
						this.state.listView === 'icon' ? 'list-view-icon sort-by-refresh' : 'list-view-detail'
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
							// .filter(
							// 	item =>
							// 		filteredTextArr.length === 0 ||
							// 		!filteredTextArr.some(filterComp =>
							// 			item.address.includes(filterComp)
							// 		)
							// )
							.filter(item => !this.state.blackList.has(item.id+''))
							.sort(
								(a, b) =>
									this.state.sorting === 'price'
										? // to number without comma
										  this.priceToNumber(b[this.state.sorting]) -
										  this.priceToNumber(a[this.state.sorting])
										: b[this.state.sorting] - a[this.state.sorting]
							)
							.map((item, idx) => {
								console.log('item:', item)
								return (
									<HouseItem
										className={`item-house`}
										key={`house-${item.id}`}
										item={item}
										isProtected={this.state.protectList.has(`${item.id}`)}
										onClickDeleteIcon={this.onClickDeleteIcon}
										onClickAddProtectIcon={this.onClickAddProtectIcon}
										onClickDeleteProtectIcon={this.onClickDeleteProtectIcon}
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
