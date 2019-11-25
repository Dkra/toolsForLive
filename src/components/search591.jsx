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
			cookie: 'user_index_role=1; T591_TOKEN=7a0d709af5a2c98338ad937f213058b5; urlJumpIp=1; urlJumpIpByTxt=%E5%8F%B0%E5%8C%97%E5%B8%82; _ga=GA1.4.237250086.1567346615; _ga=GA1.3.237250086.1567346615; __auc=e68d1f0b16ced236665272b380e; 561c38c1115322c4bad3e8dea3a18f82=1; is_new_index=1; is_new_index_redirect=1; _fbp=fb.2.1573650044075.977450676; webp=1; PHPSESSID=itnv00te637ojm7a9tje26gdl1; imgClick=8479173; localTime=2; new_rent_list_kind_test=0; userLoginHttpReferer=https%253A%252F%252Frent.591.com.tw%252F%253Fkind%253D2%2526region%253D1%2526section%253D5%252C3%252C7%252C4%252C1%2526rentprice%253D11000%252C15000%2526area%253D8%252C12%2526not_cover%253D1%2526role%253D1; u_info=%2FLVTN%2BgX%2FehhHOKrlmvb9wFWJvbEe6YYc6n6; 591equipment=08257200015746044572414258; user_browse_recent=a%3A5%3A%7Bi%3A0%3Ba%3A2%3A%7Bs%3A4%3A%22type%22%3Bi%3A1%3Bs%3A7%3A%22post_id%22%3Bs%3A7%3A%228503547%22%3B%7Di%3A1%3Ba%3A2%3A%7Bs%3A4%3A%22type%22%3Bi%3A1%3Bs%3A7%3A%22post_id%22%3Bs%3A7%3A%228499306%22%3B%7Di%3A2%3Ba%3A2%3A%7Bs%3A4%3A%22type%22%3Bi%3A1%3Bs%3A7%3A%22post_id%22%3Bs%3A7%3A%228505076%22%3B%7Di%3A3%3Ba%3A2%3A%7Bs%3A4%3A%22type%22%3Bi%3A1%3Bs%3A7%3A%22post_id%22%3Bs%3A7%3A%227921563%22%3B%7Di%3A4%3Ba%3A2%3A%7Bs%3A4%3A%22type%22%3Bi%3A1%3Bs%3A7%3A%22post_id%22%3Bs%3A7%3A%228506003%22%3B%7D%7D; ba_cid=a%3A5%3A%7Bs%3A6%3A%22ba_cid%22%3Bs%3A32%3A%220f936da15c1584ac71db9673406c7afb%22%3Bs%3A7%3A%22page_ex%22%3Bs%3A48%3A%22https%3A%2F%2Frent.591.com.tw%2Frent-detail-8499306.html%22%3Bs%3A4%3A%22page%22%3Bs%3A48%3A%22https%3A%2F%2Frent.591.com.tw%2Frent-detail-8503547.html%22%3Bs%3A7%3A%22time_ex%22%3Bi%3A1574604663%3Bs%3A4%3A%22time%22%3Bi%3A1574604922%3B%7D; cookie_login_user_id=2414258; c10f3143a018a0513ebe1e8d27b5391c=1; _gid=GA1.3.1055872961.1574697730; _gat=1; _gid=GA1.4.1055872961.1574697730; _dc_gtm_UA-97423186-1=1; _gat_UA-97423186-1=1; XSRF-TOKEN=eyJpdiI6IlgyTW5NQVo0SEFhVmI2aDVuTVNyQ0E9PSIsInZhbHVlIjoiMm9TUjNwSnBVbWV5ZmtTcjFxaG9EWmh3Q294ZzRsZjNnVnJoWEM3V3ljXC81ZENSWmFpaFZ5OGQxK3B3TEFqMDBQMFBXTWo0OHk0QjVEaFRYSFlpN1B3PT0iLCJtYWMiOiJmN2E3OTBiMDhmYTAyZjQwZWQzMGYzNWE5MmQ3MmVlYjE5ODExNzdlZDYyMjU2NGU0Y2RlZGY1ZGIwZjFjMWJhIn0%3D; 591_new_session=eyJpdiI6IlpUeWRIbGZxVzNFZGhkcXhnNEpIMkE9PSIsInZhbHVlIjoiUXpNOUFlcExvV0NjSEVVOEhSSWRCNHd1TitCbVRyS3dFK3JzQWpwXC9tczI2bjQ3d0pyT0JweHhLQlgwMHJaUzdObWE5MHhCbGRib0txK042YWRNY1RBPT0iLCJtYWMiOiIyOGQ3M2JlOGQ4MTBmMWJmZGI4MTU0ZTM1YzdhMjMwYmQ5NmM4MDM3MWJkOTg4MWM2NWRkN2FjMjZiNWRkZjEzIn0%3D',
			csrftoken: 'NLPpuA2vS7bC0IMyysmjHYuYm9P2oYPfZXavm3nf',
			sorting: 'price', // refreshtime, browsenum, price
			listView: 'icon', // detail, icon
			filteredText: store.get('filteredText') || '',
			houseData: [],
			blackList: new Set(),
			protectList: new Set(),
			priceLow: store.get('priceLow') || 12,
			priceHigh: store.get('priceHigh') || 13
		}
	}
	
	componentDidMount() {
		const url = `http://localhost:8888/api/search591`;
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


	// TODO: onCancelAllProtectItem


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

		const {cookie, csrftoken} = this.state;

		ax.get(url, {
			params: {
				priceLow: this.state.priceLow * 1000,
				priceHigh: this.state.priceHigh * 1000,
				cookie,
				csrftoken
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

		// Update view without waiting for API response
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
		
		// Update view without waiting for API response
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

	isFilteredbyText = (item) => {
		const {
			filteredText
		} = this.state
		const filteredTextArr = filteredText
			.split(',')
			.map(comp => comp.trim())
			// not empty string and company name should at least two character
			.filter(comp => comp && comp.length >= 2)

		const willFilter = !filteredTextArr.length ? false : filteredTextArr.some(filterComp =>
			item.address.includes(filterComp)
		)
		return willFilter
	}
	render() {
		const {
			cookie,
			csrftoken,
			listView,
			blackList,
			priceHigh,
			priceLow,
			filteredText,
		} = this.state
		
		const filteredTextArr = filteredText
			.split(',')
			.map(comp => comp.trim())
			// not empty string and company name should at least two character
			.filter(comp => comp && comp.length >= 2)

		return (
			<div>
				<div>
					<Input
						defaultValue={cookie}
						className="input-filter"
						placeholder="cookie"
						onChange={(e) => this.setState({cookie: e.target.value})}
						title="cookie"
					/>
					<Input
						defaultValue={csrftoken}
						className="input-filter"
						placeholder="csrftoken"
						onChange={(e) => this.setState({csrftoken: e.target.value})}
						title="csrftoken"
					/>
				</div>
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
						onChange={e => {
							store.set('priceLow', e.target.value)
							this.setState({ priceLow: e.target.value })
						}}
					/>~
					<Input
						style={{ width: 100, marginRight: 10 }}
						value={priceHigh}
						placeholder="Price High"
						onChange={e => {
							store.set('priceHigh', e.target.value)
							this.setState({ priceHigh: e.target.value })
						}}
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
										isFilteredbyText={this.isFilteredbyText(item)}
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
