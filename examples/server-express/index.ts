import express from 'express'
import { ShadeOTC } from '../../packages/sdk/src/core/shadeotc'

const app = express()
app.use(express.json())

const sdk = new ShadeOTC({ circuitPath: './packages/sdk/src/noir/circuits/otc/circuit.nr' })

app.post('/create-proof', async (req, res) => {
  try {
    const proof = await sdk.createOTCProof(req.body)
    res.json(proof)
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
})

app.listen(3000, () => console.log('Express example listening on 3000'))
