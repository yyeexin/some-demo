import React from 'react'

const UserDetail = props => {
	return <div>Detail{props.match.params.id}</div>
}

export default UserDetail
