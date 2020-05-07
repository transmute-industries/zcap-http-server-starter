const generateRootCapability = require("./generateRootCapability");

const getInvokedCapability = async ({ id }) => {
  const zcap = await generateRootCapability(id);
  if (zcap) {
    return zcap;
  }
};

module.exports = getInvokedCapability;
