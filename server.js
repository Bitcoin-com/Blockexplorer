const express = require('express');
const next = require('next');
const proxy = require('http-proxy-middleware');
require('dotenv').config()

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const DEV_PROXY_URL = 'https://explorerbeta.bitcoin.com';

app.prepare()
.then(() => {
  const server = express()

  if (dev) {
    server.use('/:chain/api', proxy({
      target: DEV_PROXY_URL,
      changeOrigin: true,
    }));
  }

  server.get('/:chain/block/:hash', (req, res) => {
    const actualPage = '/block'
    const { chain, hash } = req.params;

    const queryParams = { 
      chain,
      hash,
    } 

    app.render(req, res, actualPage, queryParams)
  });

  server.get('/:chain/address/:address', (req, res) => {
    const actualPage = '/address'
    const { chain, address } = req.params;

    const queryParams = { 
      chain,
      address,
    } 

    app.render(req, res, actualPage, queryParams)
  });

  server.get('/:chain/tx/:txid', (req, res) => {
    const actualPage = '/tx'
    const { chain, txid } = req.params;

    const queryParams = { 
      chain,
      txid,
    } 

    app.render(req, res, actualPage, queryParams)
  });

  server.get('/:chain', (req, res) => {
    const actualPage = '/';
    const { chain } = req.params;

    const queryParams = { 
      chain,
    } 

    app.render(req, res, actualPage, queryParams)
  });

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})
