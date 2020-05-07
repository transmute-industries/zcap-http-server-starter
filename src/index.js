const fastify = require("fastify");

// TODO: Move to config
const baseUrl = "http://localhost:9876";

const zcapPreValidation = require("./zcapPreValidation");

class ZCAPServerFastify {
  constructor(fastifyConfig) {
    this.fastify = fastify(fastifyConfig);

    this.fastify.setErrorHandler(async (error, req, reply) => {
      console.log("MAIN ERROR HANDLER");
      console.log(error);
      // reply.status(500);
      // reply.send();
    });

    this.fastify.route({
      method: "GET",
      url: "/edvs/:edvId/documents/:docId",
      preValidation: async (request, reply) => {
        const url = `${baseUrl}${request.raw.originalUrl}`;
        const { method, headers } = request.raw;
        await zcapPreValidation({
          method,
          url,
          headers,
          expected: {
            target: url,
            capability:
              "http://localhost:9876/edvs/5eb2e60d-37c5-4b93-b8f9-daa59bbde9e2/zcaps/documents/z19jTBpAx7jRNTsjPjtQjicS2",
            action: "read",
          },
        });
      },
      handler: async (request, reply) => {
        return reply
          .code(200)
          .headers({
            "Content-Type": "application/json; charset=utf-8",
          })
          .send({
            id: "z19jTBpAx7jRNTsjPjtQjicS2",
            sequence: 1,
            indexed: [
              {
                hmac: {
                  id: "urn:mockhmac:1",
                  type: "Sha256HmacKey2019",
                },
                sequence: 1,
                attributes: [],
              },
            ],
            jwe: {
              protected: "eyJlbmMiOiJDMjBQIn0",
              recipients: [
                {
                  header: {
                    kid: "urn:123",
                    alg: "ECDH-ES+A256KW",
                    epk: {
                      kty: "OKP",
                      crv: "X25519",
                      x: "EkoCYkZQazJ3UfhqGSPYiSn8UtAeucoXL2TeHNWILAU",
                    },
                    apu: "EkoCYkZQazJ3UfhqGSPYiSn8UtAeucoXL2TeHNWILAU",
                    apv: "dXJuOjEyMw",
                  },
                  encrypted_key:
                    "23jYgGcFbJnKhKKDB5RINGXK5-9uqBOh-iU9AkN1mPXQa847FDJ3Pg",
                },
              ],
              iv: "NI03ehqk4K0XoAWp",
              ciphertext: "boVn_Z464OLBH0-WEQ6g3LF8r7NlVCH4j6b7FI9x63-gOm4",
              tag: "2WYgD9che3ZH83OJ0ZeVoQ",
            },
          });
      },
    });
  }
}

module.exports = ZCAPServerFastify;
