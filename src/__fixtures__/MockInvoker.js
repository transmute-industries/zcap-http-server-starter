/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
"use strict";

const forge = require("node-forge");
const { decode } = require("./BadEncoding");

const {
  pki: { ed25519 }
} = forge;

const keypair = {
  id: 'did:key:z6MkuSGP2ZuhnTyt6zRPab44sJhKmjsNfUacwSksymUiYvhD#z6MkuSGP2ZuhnTyt6zRPab44sJhKmjsNfUacwSksymUiYvhD',
  controller: "did:key:z6MkuSGP2ZuhnTyt6zRPab44sJhKmjsNfUacwSksymUiYvhD",
  type: "Ed25519VerificationKey2018",
  privateKeyBase58:
    "5crbUbtC8vgm6Wez13UitVLHSvAnCrWNSCcN8Vi4qNbmmRT5TYYCJryp72SbnMZwooDR6Kx5yeZtm6Ad8VFxziis",
  publicKeyBase58: "Fz1LSKfGSvVQzVagu26E2D9KxAbXFbLGFRqx9VWhdhuq"
};

module.exports = class MockInvoker {
  constructor({
    publicKeyBase58 = keypair.publicKeyBase58,
    privateKeyBase58 = keypair.privateKeyBase58
  } = {}) {
    this.id = "did:key:z6MkuSGP2ZuhnTyt6zRPab44sJhKmjsNfUacwSksymUiYvhD#z6MkuSGP2ZuhnTyt6zRPab44sJhKmjsNfUacwSksymUiYvhD";
    this.type = "Ed25519VerificationKey2018";

    this.privateKey = decode(privateKeyBase58);
    this.privateKey58 = decode(publicKeyBase58);
  }

  async sign({ data }) {
    const { privateKey } = this;
    return ed25519.sign({ message: data, privateKey });
  }
};
