import Fastify from 'fastify'
import { ShadeOTC } from '../../packages/sdk/src/core/shadeotc'

const server = Fastify()
const sdk = new ShadeOTC({ circuitPath: './packages/sdk/src/noir/circuits/otc/circuit.nr' })

server.post('/create-proof', async (request, reply) => {
  try {
    const proof = await sdk.createOTCProof(request.body as any)
    return proof
  } catch (err: any) {
    reply.code(500).send({ error: err.message })
  }
})

server.listen({ port: 3001 }, (err, addr) => {
  if (err) throw err
  console.log('Fastify example listening on', addr)
})
