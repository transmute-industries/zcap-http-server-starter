const request = require("supertest");

const ZCAPServerFastify = require("../index");

const zcapInvoke = require("http-signature-zcap-invoke");

const MockInvoker = require("../__fixtures__/MockInvoker");

let invocationSigner = new MockInvoker();

let server;

beforeAll(async () => {
  const fastifyConfig = { logger: false };
  server = new ZCAPServerFastify(fastifyConfig);
  await server.fastify.listen(9876);
  await server.fastify.ready();
});

describe("server", () => {
  test("can get with zcap-http", async () => {
    const zcapInvokeArgs = {
      capability:
        "http://localhost:9876/edvs/5eb2e60d-37c5-4b93-b8f9-daa59bbde9e2/zcaps/documents/z19jTBpAx7jRNTsjPjtQjicS2",
      action: "read",
      target:
        "http://localhost:9876/edvs/5eb2e60d-37c5-4b93-b8f9-daa59bbde9e2/documents/z19jTBpAx7jRNTsjPjtQjicS2"
    };
    const zCapHeaders = await zcapInvoke.signCapabilityInvocation({
      url: zcapInvokeArgs.target,
      method: "GET",
      headers: { Accept: "application/ld+json, application/json" },
      json: {},
      capability: zcapInvokeArgs.capability,
      invocationSigner,
      capabilityAction: zcapInvokeArgs.action
    });
    const response = await request(server.fastify.server)
      .get(
        "/edvs/5eb2e60d-37c5-4b93-b8f9-daa59bbde9e2/documents/z19jTBpAx7jRNTsjPjtQjicS2"
      )
      .set(zCapHeaders);
    expect(response.body.id).toBe("z19jTBpAx7jRNTsjPjtQjicS2");
  });
});
