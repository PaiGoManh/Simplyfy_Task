const express = require("express");
const router = express.Router();
const { ClientApplication } = require("./client");

router.post("/assets", async (req, res) => {
  try {
    const { assetID, owner, value } = req.body;
    const client = new ClientApplication();

    const result = await client.submitTxn(
      "org1",
      "admin",
      "taskchannel",
      "SimplyFi-Task",
      "AssetTransfer",
      "invokeTxn",
      "CreateAsset",
      assetID,
      owner,
      value.toString()
    );

    res.status(201).json({ success: true, data: JSON.parse(result) });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get("/assets", async (req, res) => {
  try {
    const client = new ClientApplication();
    const result = await client.submitTxn(
      "org1",
      "auditor",
      "taskchannel",
      "SimplyFi-Task",
      "AssetTransfer",
      "queryAuditor",
      "GetAllAssets"
    );

    res.status(200).json({ success: true, data: JSON.parse(result) });
  } catch (error) {
    res.status(403).json({ success: false, error: "Access denied." });
  }
});

router.get("/assets/:id", async (req, res) => {
  try {
    const { id: assetID } = req.params;
    // const role = req.query.role || "user"; // Default to user

    const client = new ClientApplication();
    const result = await client.submitTxn(
      "org1",
      "user",
      "taskchannel",
      "SimplyFi-Task",
      "AssetTransfer",
      "queryUser",
      "ReadAsset",
      assetID
    );

    res.status(200).json({ success: true, data: JSON.parse(result) });
  } catch (error) {
    res.status(404).json({ success: false, error: error.message });
  }
});

router.put("/assets/:id", async (req, res) => {
  try {
    const { id: assetID } = req.params;
    const { newValue, newOwner } = req.body;

    const client = new ClientApplication();
    const result = await client.submitTxn(
      "org1",
      "admin",
      "taskchannel",
      "SimplyFi-Task",
      "AssetTransfer",
      "invokeTxn",
      "UpdateAsset",
      assetID,
      newValue,
      newOwner
    );

    res.status(200).json({ success: true, data: JSON.parse(result) });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.delete("/assets/:id", async (req, res) => {
  try {
    const { id: assetID } = req.params;
    const client = new ClientApplication();
    const result = await client.submitTxn(
      "org1",
      "admin",
      "taskchannel",
      "SimplyFi-Task",
      "AssetTransfer",
      "invokeTxn",
      "DeleteAsset",
      assetID
    );

    res
      .status(200)
      .json({ success: true, message: JSON.parse(result).message });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
