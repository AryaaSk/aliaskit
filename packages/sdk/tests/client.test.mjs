import test from 'node:test'
import assert from 'node:assert/strict'
import { AliasKit, AliasKitError } from '../dist/index.js'

function createJsonResponse(body, init = {}) {
  return new Response(JSON.stringify(body), {
    status: init.status ?? 200,
    headers: { 'content-type': 'application/json' },
  })
}

test('identities.create sends auth header and body', async () => {
  const calls = []
  const client = new AliasKit({
    apiKey: 'ak_live_test',
    baseUrl: 'https://api.example.com/api/v1',
    fetch: async (url, init) => {
      calls.push({ url, init })
      return createJsonResponse({ id: 'id_1', name: 'Jane', status: 'active' })
    },
  })

  await client.identities.create({ name: 'Jane' })

  assert.equal(calls.length, 1)
  assert.equal(calls[0].url, 'https://api.example.com/api/v1/identities')
  assert.equal(calls[0].init.method, 'POST')
  assert.equal(calls[0].init.headers.Authorization, 'Bearer ak_live_test')
  assert.equal(calls[0].init.body, JSON.stringify({ name: 'Jane' }))
})

test('identities.list appends query parameters', async () => {
  const calls = []
  const client = new AliasKit({
    apiKey: 'ak_live_test',
    baseUrl: 'https://api.example.com/api/v1',
    fetch: async (url, init) => {
      calls.push({ url, init })
      return createJsonResponse({ data: [] })
    },
  })

  await client.identities.list({ limit: 10, cursor: 'abc' })
  assert.equal(calls[0].url, 'https://api.example.com/api/v1/identities?limit=10&cursor=abc')
})

test('error responses throw AliasKitError with status', async () => {
  const client = new AliasKit({
    apiKey: 'ak_live_test',
    fetch: async () => createJsonResponse({ error: 'Not found' }, { status: 404 }),
  })

  await assert.rejects(
    client.identities.get('missing'),
    (error) =>
      error instanceof AliasKitError &&
      error.status === 404 &&
      error.message === 'Not found'
  )
})
