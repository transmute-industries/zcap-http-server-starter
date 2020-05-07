const jsonld = require("jsonld");
const resolver = require("./resolver");
const generateRootCapability = require("./generateRootCapability");
const documentLoader = jsonld.documentLoaders.node();

const wrappedDocumentLoader = async (url) => {
  // console.log(url)

  // Resolve DIDs
  if (url.startsWith("did:key")) {
    const didDoc = await resolver(url);
    return {
      contextUrl: null,
      documentUrl: url,
      document: didDoc,
    };
  }
  // Resolve Capabilities
  if (url.startsWith("http://localhost:9876/edvs/")) {
    const zcap = await generateRootCapability(url);
    return {
      contextUrl: null,
      documentUrl: url,
      document: zcap,
    };
  }
  // Resolve Contexts
  if (url.startsWith("https://w3id.org/did/v0.11")) {
    return documentLoader("https://w3id.org/did/v0.11");
  }
};

module.exports = wrappedDocumentLoader;
