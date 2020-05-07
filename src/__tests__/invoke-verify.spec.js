const zcapInvoke = require("http-signature-zcap-invoke");
const zcapVerify = require("http-signature-zcap-verify");

const jsigs = require("jsonld-signatures");

const { Ed25519Signature2018 } = jsigs.suites;

const MockInvoker = require("../__fixtures__/MockInvoker");

const wrappedDocumentLoader = require("../__fixtures__/wrappedDocumentLoader");
const getInvokedCapability = require("../__fixtures__/getInvokedCapability");

let invocationSigner = new MockInvoker();

describe("zcap", () => {
  test("invoke & verify on GET", async () => {
    const zcapInvokeArgs = {
      capability:
        "http://localhost:9876/edvs/5eb2e60d-37c5-4b93-b8f9-daa59bbde9e2/zcaps/documents/z19jTBpAx7jRNTsjPjtQjicS2",
      action: "read",
      target:
        "http://localhost:9876/edvs/5eb2e60d-37c5-4b93-b8f9-daa59bbde9e2/documents/z19jTBpAx7jRNTsjPjtQjicS2",
    };

    const zCapHeaders = await zcapInvoke.signCapabilityInvocation({
      url: zcapInvokeArgs.target,
      method: "GET",
      headers: { Accept: "application/ld+json, application/json" },
      json: {},
      capability: zcapInvokeArgs.capability,
      invocationSigner,
      capabilityAction: zcapInvokeArgs.action,
    });

    // console.log(JSON.stringify(zCapHeaders, null, 2))

    const result = await zcapVerify.verifyCapabilityInvocation({
      url: zcapInvokeArgs.target,
      method: "GET",
      headers: zCapHeaders,
      getInvokedCapability,
      documentLoader: wrappedDocumentLoader,
      expectedHost: zCapHeaders.host,
      expectedTarget: zcapInvokeArgs.target,
      expectedRootCapability: zcapInvokeArgs.capability,
      expectedAction: zcapInvokeArgs.action,
      // TODO: support RsaSignature2018 and other suites?
      suite: [new Ed25519Signature2018()],
    });
    // console.log(result)
    expect(result.verified).toBe(true);
    // console.log(JSON.stringify(result, null, 2));
  });
});
