import Fastify from "fastify";
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import { Static, Type } from '@sinclair/typebox'

const fastify = Fastify({
  logger: true
}).withTypeProvider<TypeBoxTypeProvider>();


const Qs = Type.Object({
  num: Type.Optional(Type.Number()),
})

const Resp = Type.Object({
  hello: Type.String(),
})

fastify.get<{
  Querystring: Static<typeof Qs>,
  Reply: Static<typeof Resp>,
}>(
  '/', {
    schema: {
      querystring: Qs,
      response: {
        200: Resp,
      }
    },
  }, async (request, reply) => {
    const q = request.query;
    return {
      hello: 'world',
    };
  },
);

fastify.listen({ port: 3000, host: '0.0.0.0' }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`server listening on ${address}`)
})