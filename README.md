## ZCAP HTTP Server Starter

The purpose of this repo is to provide a minimal example of how ZCAPs for HTTP Signatures are used.

Imagine you have a resource such as:

http://localhost:9876/edvs/5eb2e60d-37c5-4b93-b8f9-daa59bbde9e2/documents/z19jTBpAx7jRNTsjPjtQjicS2

You want to read that resource, so you make a GET request for it with some special headers:

```json
{
  "accept": "application/ld+json, application/json",
  "host": "localhost:9876",
  "capability-invocation": "zcap id=\"http://localhost:9876/edvs/5eb2e60d-37c5-4b93-b8f9-daa59bbde9e2/zcaps/documents/z19jTBpAx7jRNTsjPjtQjicS2\",action=\"read\"",
  "digest": "mh=uEiBEE2-jVbNnihFGrRb36GSelPtPwh_nfoMQwGD2HKr_ig",
  "content-type": "application/json",
  "authorization": "Signature keyId=\"did:key:z6MkuSGP2ZuhnTyt6zRPab44sJhKmjsNfUacwSksymUiYvhD#z6MkuSGP2ZuhnTyt6zRPab44sJhKmjsNfUacwSksymUiYvhD\",headers=\"(key-id) (created) (expires) (request-target) host capability-invocation content-type digest\",signature=\"MZP93KR3/WJTPxNl48t75y5PJ7JDybTUIlbzVEV+2o0TAuLs0HQuP0DVkVag0l0bGObbGWZpNvpj5xFVXlbkCw==\",created=\"1588875408616\",expires=\"1588876008616\""
}
```

On the server, the capability referenced is retrieved (or generated on the fly), and the invocation is verified. Here is the result:

```json
{
  "verified": true,
  "invoker": {
    "id": "did:key:z6MkuSGP2ZuhnTyt6zRPab44sJhKmjsNfUacwSksymUiYvhD",
    "assertionMethod": [
      "did:key:z6MkuSGP2ZuhnTyt6zRPab44sJhKmjsNfUacwSksymUiYvhD#z6MkuSGP2ZuhnTyt6zRPab44sJhKmjsNfUacwSksymUiYvhD"
    ],
    "authentication": [
      "did:key:z6MkuSGP2ZuhnTyt6zRPab44sJhKmjsNfUacwSksymUiYvhD#z6MkuSGP2ZuhnTyt6zRPab44sJhKmjsNfUacwSksymUiYvhD"
    ],
    "capabilityDelegation": [
      "did:key:z6MkuSGP2ZuhnTyt6zRPab44sJhKmjsNfUacwSksymUiYvhD#z6MkuSGP2ZuhnTyt6zRPab44sJhKmjsNfUacwSksymUiYvhD"
    ],
    "capabilityInvocation": [
      "did:key:z6MkuSGP2ZuhnTyt6zRPab44sJhKmjsNfUacwSksymUiYvhD#z6MkuSGP2ZuhnTyt6zRPab44sJhKmjsNfUacwSksymUiYvhD"
    ],
    "keyAgreement": [
      {
        "id": "did:key:z6MkuSGP2ZuhnTyt6zRPab44sJhKmjsNfUacwSksymUiYvhD#zC5Y5ysBTwq4ftQ49aRHUPE4X3LJ9ECNyEVGzgNA91MPPe",
        "type": "did:/X25519KeyAgreementKey2019",
        "controller": "did:key:z6MkuSGP2ZuhnTyt6zRPab44sJhKmjsNfUacwSksymUiYvhD",
        "publicKeyBase58": "63NGVzekTKPTJ1B81nuR4tqk62LGdgMjbPheX5LcF9HS"
      }
    ],
    "publicKey": "did:key:z6MkuSGP2ZuhnTyt6zRPab44sJhKmjsNfUacwSksymUiYvhD#z6MkuSGP2ZuhnTyt6zRPab44sJhKmjsNfUacwSksymUiYvhD"
  },
  "capability": {
    "@context": "https://w3id.org/security/v2",
    "id": "http://localhost:9876/edvs/5eb2e60d-37c5-4b93-b8f9-daa59bbde9e2/zcaps/documents/z19jTBpAx7jRNTsjPjtQjicS2",
    "invocationTarget": "http://localhost:9876/edvs/5eb2e60d-37c5-4b93-b8f9-daa59bbde9e2/documents/z19jTBpAx7jRNTsjPjtQjicS2",
    "controller": "did:key:z6MkuSGP2ZuhnTyt6zRPab44sJhKmjsNfUacwSksymUiYvhD#z6MkuSGP2ZuhnTyt6zRPab44sJhKmjsNfUacwSksymUiYvhD",
    "invoker": "did:key:z6MkuSGP2ZuhnTyt6zRPab44sJhKmjsNfUacwSksymUiYvhD#z6MkuSGP2ZuhnTyt6zRPab44sJhKmjsNfUacwSksymUiYvhD",
    "delegator": "did:key:z6MkuSGP2ZuhnTyt6zRPab44sJhKmjsNfUacwSksymUiYvhD#z6MkuSGP2ZuhnTyt6zRPab44sJhKmjsNfUacwSksymUiYvhD"
  },
  "capabilityAction": "read",
  "verificationMethod": {
    "id": "did:key:z6MkuSGP2ZuhnTyt6zRPab44sJhKmjsNfUacwSksymUiYvhD#z6MkuSGP2ZuhnTyt6zRPab44sJhKmjsNfUacwSksymUiYvhD",
    "type": "Ed25519VerificationKey2018",
    "controller": {
      "id": "did:key:z6MkuSGP2ZuhnTyt6zRPab44sJhKmjsNfUacwSksymUiYvhD",
      "assertionMethod": [
        "did:key:z6MkuSGP2ZuhnTyt6zRPab44sJhKmjsNfUacwSksymUiYvhD#z6MkuSGP2ZuhnTyt6zRPab44sJhKmjsNfUacwSksymUiYvhD"
      ],
      "authentication": [
        "did:key:z6MkuSGP2ZuhnTyt6zRPab44sJhKmjsNfUacwSksymUiYvhD#z6MkuSGP2ZuhnTyt6zRPab44sJhKmjsNfUacwSksymUiYvhD"
      ],
      "capabilityDelegation": [
        "did:key:z6MkuSGP2ZuhnTyt6zRPab44sJhKmjsNfUacwSksymUiYvhD#z6MkuSGP2ZuhnTyt6zRPab44sJhKmjsNfUacwSksymUiYvhD"
      ],
      "capabilityInvocation": [
        "did:key:z6MkuSGP2ZuhnTyt6zRPab44sJhKmjsNfUacwSksymUiYvhD#z6MkuSGP2ZuhnTyt6zRPab44sJhKmjsNfUacwSksymUiYvhD"
      ],
      "keyAgreement": [
        {
          "id": "did:key:z6MkuSGP2ZuhnTyt6zRPab44sJhKmjsNfUacwSksymUiYvhD#zC5Y5ysBTwq4ftQ49aRHUPE4X3LJ9ECNyEVGzgNA91MPPe",
          "type": "did:/X25519KeyAgreementKey2019",
          "controller": "did:key:z6MkuSGP2ZuhnTyt6zRPab44sJhKmjsNfUacwSksymUiYvhD",
          "publicKeyBase58": "63NGVzekTKPTJ1B81nuR4tqk62LGdgMjbPheX5LcF9HS"
        }
      ],
      "publicKey": "did:key:z6MkuSGP2ZuhnTyt6zRPab44sJhKmjsNfUacwSksymUiYvhD#z6MkuSGP2ZuhnTyt6zRPab44sJhKmjsNfUacwSksymUiYvhD"
    },
    "publicKeyBase58": "Fz1LSKfGSvVQzVagu26E2D9KxAbXFbLGFRqx9VWhdhuq"
  }
}
```

Let's break down that result:

The `invoker` is the resolved DID Document of the identifier that is invoking the read capability.

The `verificationMethod` is a resolved key from the invoker's DID Document.

The `capability` is a JSON-LD Resource where:

1. `id` is a URI identifiying the capability.
2. `invocationTarget` is the REST API resource.
3. `controller`, `invoker` and `delegator` all refer to the `verificationMethod` id.

The `capabilityAction` value of `read` corrosponds to the fact that the invoker made a GET request to "read" a resource.

Why does this work?

It relies on a "rootCapability" which supports all actions, and which is hard coded in this example to allow `did:key:z6MkuSGP2ZuhnTyt6zRPab44sJhKmjsNfUacwSksymUiYvhD` to do anything to the resource: `http://localhost:9876/edvs/5eb2e60d-37c5-4b93-b8f9-daa59bbde9e2/documents/z19jTBpAx7jRNTsjPjtQjicS2`...

In the future, the relationship between the capability and the invocation might be handled differently.
