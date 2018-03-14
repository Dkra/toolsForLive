import React, { Component } from 'react'
import ax from 'axios'
import ThList from 'react-icons/lib/ti/th-list'
import ThSmall from 'react-icons/lib/ti/th-small'
import Anchor from 'react-icons/lib/fa/anchor'
import apiUrl from '../utils/apiUrl'
import JobItem from './search104/JobItem'
import { Select, Input, Radio } from 'antd'
import { salaryDigitsFormater } from '../utils/digits'
import DataLoading from './common/dataLoading'
import store from 'store2'
const Option = Select.Option
const RadioGroup = Radio.Group
console.log('process.env.NODE_ENV:', process.env.NODE_ENV)
console.log('apiUrl:', apiUrl)

class search104 extends Component {
	constructor(props) {
		super(props)
		this.state = {
			radioValue: 'tpe',
			sorting: 'salaryHigh',
			listView: 'detail',
			filteredCompany: store.get('filteredCompany') || '',
			bookmark: store.get('bookmark') || { tpe: '', tch: '' },
			jobData: [],
			blackList: []
		} // refreshtime, browsenum, // detail, icon
	}
	componentDidMount() {
		this.fetchJobData()
	}

	componentWillReceiveProps() {}

	fetchJobData = ({ area } = {}) => {
		const url = `${apiUrl}/search104`
		const { radioValue } = this.state
		ax
			.get(url, { params: { area: area || radioValue } })
			.then(response => {
				this.setState({ jobData: response.data })
			})
			.catch(error => {
				console.log('error.response:', error.response)
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

	onChangeCompFilter = e => {
		const text = e.target.value
		store.set('filteredCompany', text)
		this.setState({ filteredCompany: text })
	}

	onChangeRadio = e => {
		this.setState({ radioValue: e.target.value, jobData: [] })
		this.fetchJobData({ area: e.target.value })
	}

	onClickBookmark = (companyName, area) => {
		const nextBookmarkObj = Object.assign({}, this.state.bookmark, {
			[area]: companyName
		})
		this.setState({
			bookmark: nextBookmarkObj
		})
		store.set('bookmark', nextBookmarkObj)
	}

	scrollToBookmark = () => {
		const area = this.state.radioValue
		const currBookmark = this.state.bookmark[area]
		const scrollOptions = { behavior: 'smooth' }
		const bookmarkElm = document.querySelectorAll(
			`[data-jobNo='${currBookmark}']`
		)[0]

		bookmarkElm.scrollIntoView(true, scrollOptions)
	}

	render() {
		const {
			listView,
			blackList,
			filteredCompany,
			bookmark,
			radioValue
		} = this.state
		const filteredCompanyArr = filteredCompany
			.split(',')
			.map(comp => comp.trim())
			// not empty string and company name should at least two character
			.filter(comp => comp && comp.length >= 2)
		return (
			<div>
				<div className="toolbar-wrap">
					<RadioGroup onChange={this.onChangeRadio} value={radioValue}>
						<Radio value={'tpe'}>台北</Radio>
						<Radio value={'tch'}>台中</Radio>
					</RadioGroup>
					<Input
						defaultValue={filteredCompany}
						className="input-filter"
						placeholder="Filter is possible e.g: 大潤發, 聯電"
						onChange={e => this.onChangeCompFilter(e)}
						title="at least two character"
					/>
					<Select defaultValue="salaryHigh" onChange={this.onSelectChange}>
						<Option value="salaryHigh">By Salary</Option>
						<Option value="appearDate">By Date</Option>
					</Select>
					<div className="view-option">
						<ThList
							className={`${listView === 'detail' ? 'active' : ''}`}
							onClick={() => this.onChangeListView('detail')}
						/>
						{/* <ThSmall
							className={`${listView === 'icon' ? 'active' : ''}`}
							onClick={() => this.onChangeListView('icon')}
						/> */}

						{this.state.jobData.length !== 0 && bookmark[radioValue] !== '' ? (
							<Anchor
								className="icon-scrollto"
								onClick={this.scrollToBookmark}
							/>
						) : null}
					</div>
				</div>

				<section
					className={`item-job-wrap ${
						this.state.listView === 'icon' ? 'sort-by-refresh' : ''
					}`}
				>
					{this.state.jobData.length === 0 ? (
						<DataLoading className="loading-img" />
					) : (
						this.state.jobData
							// .filter(item => !this.state.blackList.includes(item.id))
							.filter(
								item =>
									filteredCompanyArr.length === 0 ||
									!filteredCompanyArr.some(filterComp =>
										item.custName.includes(filterComp)
									)
							)
							.sort(
								(a, b) =>
									salaryDigitsFormater(b[this.state.sorting]) -
									salaryDigitsFormater(a[this.state.sorting])
							)
							.map((item, idx) => {
								return (
									<JobItem
										className={`item-job`}
										key={`job-${idx}`}
										item={item}
										onClickDeleteIcon={this.onClickDeleteIcon}
										onClickBookmark={this.onClickBookmark}
										area={radioValue}
										bookmark={bookmark[radioValue]}
									/>
								)
							})
					)}
				</section>
			</div>
		)
	}
}

export default search104
