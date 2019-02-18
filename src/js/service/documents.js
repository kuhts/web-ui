import { fetch, } from 'js/utils'
import { UIPath, } from 'js/utils/url'

const base = `${UIPath}workout`
const urls = {
  create: () => `${base}/create`,
  edit: (id) => `${base}/${id}/edit`,
  view: (id) => `${base}/${id}/`,
}
const documents = {
  getMany,
  create,
  get,
  write,
  urls,
}

export {
  documents,
}

function write(id, json) {
  return fetch(`api/documents/${id}`, {
    method: 'put',
    json,
  })
}

function get(id) {
  return fetch(`api/documents/${id}`, {
    method: 'get',
  })
}

function getMany(json) {
  return fetch('api/documents', {
    method: 'get',
    json,
  })
}

function create(json) {
  return fetch('api/documents', {
    json,
  })
}
