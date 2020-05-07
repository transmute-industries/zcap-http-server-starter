const zcapVerify = require("http-signature-zcap-verify");
const wrappedDocumentLoader = require("./__fixtures__/wrappedDocumentLoader");
const getInvokedCapability = require("./__fixtures__/getInvokedCapability");

const jsigs = require("jsonld-signatures");

const { Ed25519Signature2018 } = jsigs.suites;

const preValidation = async ({ method, url, headers, expected }) => {
  const result = await zcapVerify.verifyCapabilityInvocation({
    url,
    method,
    headers,
    getInvokedCapability,
    documentLoader: wrappedDocumentLoader,
    expectedHost: headers.host,
    expectedTarget: expected.target,
    expectedRootCapability: expected.capability,
    expectedAction: expected.action,
    // TODO: support RsaSignature2018 and other suites?
    suite: [new Ed25519Signature2018()]
  });

  if (!result.verified) {
    throw new Error("ZCAP Verification Failed.");
  }
};

module.exports = preValidation;
