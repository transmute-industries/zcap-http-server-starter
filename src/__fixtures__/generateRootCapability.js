const jsigs = require("jsonld-signatures");
const { SECURITY_CONTEXT_V2_URL } = jsigs;

// TODO MOVE
const target =
  "http://localhost:9876/edvs/5eb2e60d-37c5-4b93-b8f9-daa59bbde9e2/documents/z19jTBpAx7jRNTsjPjtQjicS2";

const verificationMethod =
  "did:key:z6MkuSGP2ZuhnTyt6zRPab44sJhKmjsNfUacwSksymUiYvhD#z6MkuSGP2ZuhnTyt6zRPab44sJhKmjsNfUacwSksymUiYvhD";

module.exports = async (url) => {
  const config = {
    controller: verificationMethod,
    invoker: verificationMethod,
    delegator: verificationMethod,
  };
  return {
    "@context": SECURITY_CONTEXT_V2_URL,
    id: url,
    invocationTarget: target,
    controller: config.controller,
    invoker: config.invoker,
    delegator: config.delegator,
  };
};
