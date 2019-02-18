import React from 'react'
import {
  ImmutableContainer,
} from 'js/utils'
import {
  documents,
} from 'js/service'
import {
  array,
  any,
} from 'prop-types'
import {
  Subscribe,
  Provider,
} from 'unstated'

export class DocumentsContainer extends ImmutableContainer {
  constructor(props) {
    super(props)
    this.state = props
  }

  setCurrent(id) {
    const record = this.record(id)
    const current = record || null
    this.setState({
      current,
    })
    return !!current
  }

  get(id) {
    return documents.get(id)
  }

  access({
    results = 10,
    page,
    sortField,
    sortOrder,
  }) {
    return documents.getMany({
      results,
      page,
      sortField,
      sortOrder,
    }).then(({
      data = [],
      total,
    }) => this.setState({
      records: data,
      total,
    }))
  }

  records() {
    return this.state.records
  }

  record(identifier) {
    return this.state.recordById[identifier]
  }

  create(data) {
    return documents.create(data)
  }

  update(id, data) {
    return documents.update(id, data)
  }
}

// Following the Singleton Service pattern (think Angular Service),
// we will instantiate the Container from within this module
export const Documents = new DocumentsContainer({
  // path: ['one', 'two'],
  current: {
    contents: [],
    id: '',
    description: '',
    name: '',
  },
  recordById: {},
  possible: [],
  records: [],
})

// Then we will wrap the provider and subscriber inside of functional
// React components. This simplifies the resuse of the module as we
// will be able to import this module as a depenency without having
// to import Unstated and/or create React Contexts  manually in the
// places that we want to Provide/Subscribe to the API Service.
// We leave the injector flexible, so you can inject a new dependency
// at any time, eg: snapshot testing
export const DocumentsProvider = (props) => (
  <Provider inject={props.inject || [Documents]}>{props.children}</Provider>
)
DocumentsProvider.propTypes = {
  inject: array,
  children: any,
}

// We also leave the subscribe "to" flexible, so you can have full
// control over your subscripton from outside of the module
export const DocumentsSubscribe = (props) => (
  <Subscribe to={props.to || [Documents]}>{props.children}</Subscribe>
)
DocumentsSubscribe.propTypes = {
  to: array,
  children: any,
}
