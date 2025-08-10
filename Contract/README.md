# Contracts

## Deploy to Sepolia
1) Create `.env` in this folder:
```
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/<YOUR_KEY>
PRIVATE_KEY=0x<YOUR_PRIVATE_KEY>
```
2) Install & compile:
```
npm i
npx hardhat compile
```
3) Deploy:
```
npx hardhat run scripts/deploy.ts --network sepolia
```
4) Note the output addresses: `DonationToken`, `DonationPool`.


