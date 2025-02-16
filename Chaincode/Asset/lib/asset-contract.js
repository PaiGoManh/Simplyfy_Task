"use strict";

const { Contract } = require("fabric-contract-api");

class AssetTransfer extends Contract {
  async CreateAsset(ctx, assetID, owner, value) {
    if (!assetID || !owner || !value) {
      throw new Error("Invalid input parameters.");
    }

    const clientID = ctx.clientIdentity;
    if (!clientID.assertAttributeValue("role", "admin")) {
      throw new Error('Only users with the "admin" role can create assets.');
    }

    const exists = await this.AssetExists(ctx, assetID);
    if (exists) {
      throw new Error(`The asset ${assetID} already exists.`);
    }

    const asset = {
      assetID,
      owner,
      value: parseInt(value), 
    };

    await ctx.stub.putState(assetID, Buffer.from(JSON.stringify(asset)));
    return JSON.stringify(asset);
  }

  async ReadAsset(ctx, assetID) {
    if (!assetID) {
      throw new Error("Asset ID is required.");
    }

    const assetJSON = await ctx.stub.getState(assetID);
    if (!assetJSON || assetJSON.length === 0) {
      throw new Error(`The asset ${assetID} does not exist.`);
    }

    const asset = JSON.parse(assetJSON.toString());

    const clientID = ctx.clientIdentity;
    const caller = clientID.getID(); 
    if (
      asset.owner !== caller &&
      !clientID.assertAttributeValue("role", "auditor") &&
      !clientID.assertAttributeValue("role", "user")
    ) {
      throw new Error("You are not authorized to view this asset.");
    }

    return assetJSON.toString();
  }

  async UpdateAsset(ctx, assetID, newValue, newOwner) {
  if (!assetID || (!newValue && !newOwner)) {
    throw new Error("Invalid input parameters.");
  }

  const clientID = ctx.clientIdentity;
  if (!clientID.assertAttributeValue("role", "admin")) {
    throw new Error('Only users with the "admin" role can update assets.');
  }

  const assetJSON = await ctx.stub.getState(assetID);
  if (!assetJSON || assetJSON.length === 0) {
    throw new Error(`The asset ${assetID} does not exist.`);
  }

  const asset = JSON.parse(assetJSON.toString());
  if (newValue) {
    asset.value = parseInt(newValue); 
  }
  if (newOwner) {
    asset.owner = newOwner;
  }

  await ctx.stub.putState(assetID, Buffer.from(JSON.stringify(asset)));
  return JSON.stringify(asset);
}

  async DeleteAsset(ctx, assetID) {
    if (!assetID) {
      throw new Error("Asset ID is required.");
    }

    const clientID = ctx.clientIdentity;
    if (!clientID.assertAttributeValue("role", "admin")) {
      throw new Error('Only users with the "admin" role can delete assets.');
    }

    const exists = await this.AssetExists(ctx, assetID);
    if (!exists) {
      throw new Error(`The asset ${assetID} does not exist.`);
    }

    await ctx.stub.deleteState(assetID);
    return JSON.stringify({ message: `Asset ${assetID} deleted successfully` }); // Return JSON
}

  async GetAllAssets(ctx) {
    const clientID = ctx.clientIdentity;
    if (!clientID.assertAttributeValue("role", "auditor")) {
      throw new Error('Only users with the "Auditor" role can view all assets.');
    }

    const iterator = await ctx.stub.getStateByRange("", "");
    const allResults = [];
    while (true) {
      const res = await iterator.next();
      if (res.value && res.value.value.toString()) {
        const asset = JSON.parse(res.value.value.toString("utf8"));
        allResults.push(asset);
      }
      if (res.done) {
        await iterator.close();
        return JSON.stringify(allResults);
      }
    }
  }

  async AssetExists(ctx, assetID) {
    const assetJSON = await ctx.stub.getState(assetID);
    return assetJSON && assetJSON.length > 0;
  }
}

module.exports = AssetTransfer;
