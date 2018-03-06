import React, { Component } from 'react'
import ax from 'axios'
import ThList from 'react-icons/lib/ti/th-list'
import ThSmall from 'react-icons/lib/ti/th-small'
import JobItem from './search104/JobItem'
import ContentLoader from 'react-content-loader'
import { Select, Input } from 'antd'
import { salaryDigitsFormater } from '../utils/digits'
import store from 'store2'
const Option = Select.Option

class search104 extends Component {
	constructor(props) {
		super(props)
		this.state = {
			sorting: 'salaryHigh',
			listView: 'detail',
			filteredCompany: store.get('filteredCompany') || '',
			jobData: [],
			blackList: []
		} // refreshtime, browsenum, // detail, icon
	}
	componentDidMount() {
		this.fetchJobData()
	}

	fetchJobData = () => {
		const url = 'http://localhost:8888/api/search104'
		ax
			.get(url)
			.then(response => {
				this.setState({
					jobData: response.data
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

	onChangeCompFilter = e => {
		const text = e.target.value
		store.set('filteredCompany', text)
		this.setState({ filteredCompany: text })
	}

	render() {
		const { listView, blackList, filteredCompany } = this.state
		const filteredCompanyArr = filteredCompany
			.split(',')
			.map(comp => comp.trim())
			// not empty string and company name should at least two character
			.filter(comp => comp && comp.length >= 2)
		return (
			<div>
				<div className="toolbar-wrap">
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
					</div>
				</div>

				<section
					className={`item-job-wrap ${
						this.state.listView === 'icon' ? 'sort-by-refresh' : ''
					}`}
				>
					{this.state.jobData.length === 0 ? (
						<ContentLoader className="loading-img">
							<rect x="0" y="0" rx="5" ry="5" width="100%" height="10" />
							<rect x="0" y="40" rx="5" ry="5" width="100%" height="10" />
							<rect x="0" y="80" rx="5" ry="5" width="100%" height="10" />
							<rect x="0" y="120" rx="5" ry="5" width="100%" height="10" />
						</ContentLoader>
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
