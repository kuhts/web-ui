import React from 'react'
import styled from 'react-emotion'
import {
  DocumentsTable,
} from 'js/component'
import {
  NavLink,
} from 'react-router-dom'
import {
  Icon,
} from 'antd'
import {
  oneOfType,
  string,
  array,
  object,
} from 'prop-types'

const StyledDashboard = styled(UnstyledDashboard)``

export {
  StyledDashboard as Dashboard,
}

function UnstyledDashboard({
  className,
}) {
  return (
    <div className={className}>
      <h2>
        Posts&nbsp;
        <NavLink to="newdocument">
          <Icon type="plus-square" />
        </NavLink>
      </h2>
      <DocumentsTable />
    </div>
  )
}
UnstyledDashboard.propTypes = {
  className: oneOfType([
    string,
    array,
    object
  ]),
}
