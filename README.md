# 🚀 Hyperledger Fabric Asset Management System with ABAC  

This project is a **Hyperledger Fabric-based asset management system** that enforces **Attribute-Based Access Control (ABAC)**. It allows users with different roles (**Admin, User, Auditor**) to interact with assets on the blockchain securely.  

---

## 📌 Features  
- ✅ **Admins** can create, update, and delete  assets.  
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
├── server/                  # Node.js REST API
│   ├── app.js         # Express.js server
│   ├── routes.js         # API routes
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


## 🛠️ Setup Instructions

### **1️⃣ Prerequisites**
Before running this project, ensure you have the following installed:
- **Node.js** (v14+ recommended)
- **Docker & Docker Compose**
- **Hyperledger Fabric binaries and samples** (`fabric-samples`)
- **Fabric CA client** (for identity management)

---

### **2️⃣ Clone the Repository**
```bash
git clone https://github.com/Manufg07/Simplyfiii.git
cd Simplyfiii
```
---

### **3️⃣ Set Up Hyperledger Fabric Network**
```bash
cd SimplyFi
chmod +x startSimplyfiNetwork1.sh
./startSimplyfiNetwork1.sh
```

### **4️⃣ Configure Client**
```bash
cd /server
npm install
cd /routes
node setupWallet.js
```
### **5️⃣ Start the REST API Server**
```bash
cd server
npm install
node app.js
```

### **🛑 Network Issues**
```bash

# Check running Docker containers
docker ps -a

# Restart the Hyperledger Fabric network
./stopSimplyfiNetwork.sh && ./startSimplyfiNetwork1.sh
```

### **🔑 Identity Issues**
```bash

# Reimport user identities

cd server
cd routes
node setupWallet.js

# Check registered CA identities
fabric-ca-client identity list --tls.certfiles organizations/fabric-ca/organization1/ca-cert.pem
```

---

## 📜 License

This project is licensed under the **Apache License 2.0** - see the [LICENSE](LICENSE.md) file for details.

---

## 🤝 Contributing

We welcome contributions! Follow these steps to contribute:
1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/new-feature`)
3. **Commit your changes** (`git commit -m 'Add new feature'`)
4. **Push to the branch** (`git push origin feature/new-feature`)
5. **Open a Pull Request**

---
