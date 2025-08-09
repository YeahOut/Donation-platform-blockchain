# Donation Platform (Point → Token → Donate)

모노레포: **Frontend (React+TS)** + **Backend (Express TS)** + **Contracts (Hardhat+Solidity)**

## Quick Start
```bash
# 1) 클론 또는 새 레포
git clone <this-repo> donation-platform && cd donation-platform

# 2) Frontend
cd frontend
npm i
npm run dev  # http://localhost:5173

# 3) Contracts
cd ../contracts
npm i
npm i -D @openzeppelin/contracts
npx hardhat compile
# .env 설정 후(아래 참조) 네트워크에 배포
npx hardhat run scripts/deploy.ts --network amoy

# 4) Backend
cd ../backend
npm i
cp .env.sample .env  # 값 채우기
npm run dev  # http://localhost:5174
