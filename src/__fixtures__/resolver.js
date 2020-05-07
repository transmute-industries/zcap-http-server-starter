// const fetch = require("node-fetch");

const didKeyDriver = require("did-method-key").driver();

// const getJson = async (url) =>
//   fetch(url, {
//     headers: {
//       Accept: "application/ld+json",
//     },
//     method: "get",
//   }).then((data) => data.json());

module.exports = async (did) => {
  if (did.startsWith("did:key:")) {
    // TODO: use universal resolver when possible
    // const baseUrl = "https://did-key.web.app/api/dids/";
    // const doc = await getJson(baseUrl + did);
    // return doc;
    const didDocument = await didKeyDriver.get({ did });
    return didDocument;
  }
  throw new Error("DID Method not supported by resolver");
};
