import React from 'react'

import UserList from '../user/user-list.jsx'

const UserPage = () => (
  <div className="ui main container">
    <h4>Manage Users</h4>
    <div className="ui grid">
      <div className="fourteen wide column">
        <UserList />
      </div>
    </div>
  </div>
)
export default UserPage