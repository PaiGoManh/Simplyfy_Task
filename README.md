# 🚀 Hyperledger Fabric Asset Management System with ABAC  

This project is a **Hyperledger Fabric-based asset management system** that enforces **Attribute-Based Access Control (ABAC)**. It allows users with different roles (**Admin, User, Auditor**) to interact with assets on the blockchain securely.  

---

## 📌 Features  
- ✅ **Admins** can create, update, and delete assets.  
- ✅ **Users** can view only their own assets.  
- ✅ **Auditors** can query and view all assets.  
- ✅ Implements **ABAC (Attribute-Based Access Control)** using user identity certificates.  
- ✅ Provides **a REST API** for interacting with Fabric via **Node.js & Express.js**.  

---

## 🛠 Project Architecture  

### 🔹 Network Components  
- **2 Organizations** (`Org1`, `Org2`)  
- **2 Peers per Organization**  
- **1 Orderer** (Raft Consensus)  
- **1 Channel** (`simplyfichannel`)  
- **Fabric CA** for Identity Management  

### 🔹 Smart Contract (Chaincode) Functionalities  
- `CreateAsset(assetID, owner, value)` - Admin creates an asset.  
- `ReadAsset(assetID)` - Users/Auditors read asset details.  
- `UpdateAsset(assetID, newValue, newOwner)` - Admin updates an asset.  
- `DeleteAsset(assetID)` - Admin deletes an asset.  
- `GetAllAssets()` - Auditors can retrieve all assets.  

---

## 📂 Directory Structure  
```bash
├── api/                  # Node.js REST API
│   ├── server.js         # Express.js server
│   ├── routes.js         # API routes
│   ├── fabricClient.js   # Fabric network interaction logic
├── chaincode/            # Chaincode for asset management
│   ├── assetContract.js  # Smart contract (Node.js)
├── config/               # Configuration files
│   ├── connection-profile/
│   │   ├── org1.json     # Org1 connection profile
│   │   ├── org2.json     # Org2 connection profile
├── network/              # Fabric network setup
│   ├── docker-compose/   # Docker setup
│   ├── scripts/          # Shell scripts for automation
└── README.md             # Project documentation
