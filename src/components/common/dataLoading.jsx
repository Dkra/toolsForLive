import React from 'react'
import ContentLoader from 'react-content-loader'

const DataLoading = ({ className }) => {
	return (
		<ContentLoader className={className}>
			<rect x="0" y="0" rx="5" ry="5" width="100%" height="10" />
			<rect x="0" y="40" rx="5" ry="5" width="100%" height="10" />
			<rect x="0" y="80" rx="5" ry="5" width="100%" height="10" />
			<rect x="0" y="120" rx="5" ry="5" width="100%" height="10" />
		</ContentLoader>
	)
}

export default DataLoading
