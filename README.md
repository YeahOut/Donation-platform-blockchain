# 🎁 Donation Service - 포인트 기부 플랫폼

> **신한은행 포인트를 활용한 투명한 블록체인 기부 서비스**

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Solidity](https://img.shields.io/badge/Solidity-0.8.24-orange.svg)](https://soliditylang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.13.0-purple.svg)](https://www.prisma.io/)


## 👀주소 모음
- 배포주소 : http://3.34.135.57/
- Swagger : http://3.34.135.57:4000/api/docs/#/
- Token 확인 주소 : https://sepolia.etherscan.io/address/0x50C371Db60A86E634974beEB1da297721119cBe8#tokentxns
- 트랜잭션 확인 주소 : https://sepolia.etherscan.io/address/0xc06424216b12c20528e7e82ea79e36bb9a83dd1c
- 데모영상 : [🎬 데모 영상 보기](https://youtu.be/SXpydQowh7E)
- 서비스 소개글 : https://yeah-out.notion.site/24b116366aba8013b533fb6714810f73?source=copy_link


## 📋 목차

- [✨ 서비스 소개](#-서비스-소개)
- [🚀 주요 기능](#-주요-기능)
- [🏗️ 기술 스택](#️-기술-스택)
- [📁 프로젝트 구조](#-프로젝트-구조)
- [⚡ 빠른 시작](#-빠른-시작)
- [🔧 개발 환경 설정](#-개발-환경-설정)
- [🌐 배포](#-배포)
- [📊 API 문서](#-api-문서)
- [🔗 블록체인 연동](#-블록체인-연동)
- [🤝 기여하기](#-기여하기)

## ✨ 서비스 소개

신한은행 포인트를 활용한 투명한 기부 플랫폼입니다. 사용자는 보유한 포인트를 기부할 수 있으며, 모든 기부 내역은 블록체인에 기록되어 투명성을 보장합니다.

### 🌟 핵심 특징

- **💎 투명성**: 모든 기부 내역이 블록체인에 기록
- **🔒 보안**: JWT 기반 인증 및 암호화된 비밀번호 저장
- **⚡ 실시간**: 실시간 포인트 잔액 및 기부 통계
- **📱 반응형**: 모바일 최적화된 UI/UX
- **🌐 크로스 플랫폼**: 웹 브라우저에서 접근 가능

## 🚀 주요 기능

### 👤 사용자 관리
- [x] 사용자 로그인/인증
- [x] 포인트 잔액 조회
- [x] 포인트 거래 내역 확인

### 💝 기부 시스템
- [x] 포인트 기부 기능
- [x] 기부 금액 설정 (1P 단위)
- [x] 기부 성공/실패 처리
- [x] 실시간 기부 통계

### 🔗 블록체인 연동
- [x] ERC-20 토큰 기반 기부 기록
- [x] Sepolia 테스트넷 연동
- [x] 기부 이벤트 로깅
- [x] 투명한 기부 내역 조회

## 🏗️ 기술 스택

### Frontend
- **React 18** - 사용자 인터페이스
- **TypeScript** - 타입 안전성
- **Tailwind CSS** - 스타일링
- **Zustand** - 상태 관리
- **React Router** - 라우팅
- **Vite** - 빌드 도구

### Backend
- **Node.js** - 서버 런타임
- **Express.js** - 웹 프레임워크
- **TypeScript** - 타입 안전성
- **Prisma** - ORM
- **MariaDB** - 데이터베이스
- **JWT** - 인증
- **bcryptjs** - 비밀번호 암호화

### Blockchain
- **Solidity** - 스마트 컨트랙트
- **Hardhat** - 개발 환경
- **Ethers.js** - 블록체인 연동
- **OpenZeppelin** - 보안 컨트랙트
- **Sepolia** - 테스트넷

### DevOps
- **Nginx** - 리버스 프록시
- **PM2** - 프로세스 관리
- **AWS EC2** - 클라우드 호스팅

## 📁 프로젝트 구조

```
donation/
├── 📁 Frontend/                 # React 프론트엔드
│   ├── 📁 src/
│   │   ├── 📁 components/      # 재사용 컴포넌트
│   │   ├── 📁 pages/          # 페이지 컴포넌트
│   │   ├── 📁 store/          # Zustand 상태 관리
│   │   └── 📁 assets/         # 정적 자산
│   ├── 📄 package.json
│   └── 📄 vite.config.ts
├── 📁 Backend/                  # Node.js 백엔드
│   ├── 📁 src/
│   │   ├── 📄 server.ts       # 메인 서버
│   │   ├── 📄 blockchain.ts   # 블록체인 연동
│   │   └── 📄 swagger.ts      # API 문서
│   ├── 📁 prisma/
│   │   ├── 📄 schema.prisma   # 데이터베이스 스키마
│   │   └── 📄 seed_mysql.sql  # 초기 데이터
│   └── 📄 package.json
├── 📁 Contract/                 # Solidity 스마트 컨트랙트
│   ├── 📁 contracts/
│   │   ├── 📄 DonationToken.sol
│   │   └── 📄 DonationPool.sol
│   ├── 📁 scripts/
│   │   └── 📄 deploy.ts
│   └── 📄 hardhat.config.ts
└── 📄 README.md
```

## ⚡ 빠른 시작

### 1. 저장소 클론
```bash
git clone https://github.com/your-username/donation-service.git
cd donation-service
```

### 2. 환경 설정
```bash
# Frontend
cd Frontend
npm install
echo 'VITE_API_BASE=http://localhost:4000' > .env.local

# Backend
cd ../Backend
npm install
cp .env.example .env
# .env 파일 수정 필요

# Contract
cd ../Contract
npm install
```

### 3. 데이터베이스 설정
```bash
cd Backend
npx prisma db push
npx prisma db execute --file prisma/seed_mysql.sql --schema prisma/schema.prisma
```

### 4. 개발 서버 실행
```bash
# Backend (터미널 1)
cd Backend
npm run dev

# Frontend (터미널 2)
cd Frontend
npm run dev
```

### 5. 블록체인 배포 (선택사항)
```bash
cd Contract
npx hardhat run scripts/deploy.ts --network sepolia
```

## 🔧 개발 환경 설정

### 필수 요구사항
- Node.js 18+
- npm 또는 yarn
- MariaDB 또는 MySQL
- Git

### 환경 변수 설정

#### Frontend (.env.local)
```env
VITE_API_BASE=http://localhost:4000
```

#### Backend (.env)
```env
# Database
DATABASE_URL="mysql://user:password@localhost:3306/donation"

# JWT
JWT_SECRET="your-secret-key"

# Blockchain (선택사항)
SEPOLIA_RPC_URL="https://sepolia.infura.io/v3/YOUR_KEY"
PRIVATE_KEY="0x..."
DONATION_TOKEN_ADDRESS="0x..."
DONATION_POOL_ADDRESS="0x..."
```

#### Contract (.env)
```env
SEPOLIA_RPC_URL="https://sepolia.infura.io/v3/YOUR_KEY"
PRIVATE_KEY="0x..."
```

## 🌐 배포

### EC2 배포 가이드

#### 1. 서버 설정
```bash
# 시스템 업데이트
sudo apt-get update && sudo apt-get upgrade -y

# Node.js 설치
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# MariaDB 설치
sudo apt-get install -y mariadb-server
sudo systemctl enable --now mariadb
```

#### 2. 애플리케이션 배포
```bash
# Frontend 빌드 및 배포
cd Frontend
npm ci
npm run build
sudo mkdir -p /var/www/donation-frontend
sudo rsync -a --delete dist/ /var/www/donation-frontend/

# Nginx 설정
sudo tee /etc/nginx/sites-available/donation >/dev/null <<'CONF'
server {
    listen 80;
    server_name _;
    root /var/www/donation-frontend;
    index index.html;
    
    location /api/ {
        proxy_pass http://127.0.0.1:4000;
    }
    
    location / {
        try_files $uri /index.html;
    }
}
CONF

sudo ln -sf /etc/nginx/sites-available/donation /etc/nginx/sites-enabled/
sudo systemctl reload nginx

# Backend 배포
cd Backend
npm ci
npm run build
npm i -g pm2
pm2 start dist/server.js --name donation-backend --update-env
pm2 save
```

## 📊 API 문서

### 인증 API
- `POST /api/login` - 사용자 로그인
- `GET /api/me` - 사용자 정보 조회

### 기부 API
- `POST /api/donate` - 기부 요청
- `POST /api/donation/:id/settle` - 기부 확정
- `GET /api/stats` - 기부 통계

### 개발용 API
- `POST /api/dev/seed` - 초기 데이터 생성

📖 **자세한 API 문서**: `http://your-domain/api/docs`

## 🔗 블록체인 연동

### 스마트 컨트랙트

#### DonationToken.sol
```solidity
// ERC-20 토큰 (소수점 0)
contract DonationToken is ERC20, Ownable {
    function decimals() public pure override returns (uint8) {
        return 0; // 정수 포인트
    }
    
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}
```

#### DonationPool.sol
```solidity
// 기부 풀 컨트랙트
contract DonationPool is Ownable {
    event Donated(address indexed donor, uint256 amount, uint256 newTotal);
    event DonatedFor(bytes32 indexed donorHash, uint256 amount, uint256 newTotal);
    
    function recordDonationFor(bytes32 donorHash, uint256 amount) external onlyOwner {
        totalDonated += amount;
        if (!hasDonatedById[donorHash]) {
            hasDonatedById[donorHash] = true;
            uniqueDonors += 1;
        }
        emit DonatedFor(donorHash, amount, totalDonated);
    }
}
```

### 블록체인 배포
```bash
cd Contract
npx hardhat compile
npx hardhat run scripts/deploy.ts --network sepolia
```

### 블록체인 확인
- **토큰**: https://sepolia.etherscan.io/token/[TOKEN_ADDRESS]
- **풀**: https://sepolia.etherscan.io/address/[POOL_ADDRESS]

## 🗄️ 데이터베이스 스키마

### 주요 테이블
- **User**: 사용자 정보
- **PointTransaction**: 포인트 거래 내역
- **Token**: 토큰 잔액 관리
- **Donation**: 기부 내역

```sql
-- 사용자 테이블
CREATE TABLE User (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    passwordHash VARCHAR(255) NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 포인트 거래 테이블
CREATE TABLE PointTransaction (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT NOT NULL,
    amount INT NOT NULL,
    note TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES User(id)
);
```

## 🧪 테스트

### 프론트엔드 테스트
```bash
cd Frontend
npm test
```

### 백엔드 테스트
```bash
cd Backend
npm test
```

### 블록체인 테스트
```bash
cd Contract
npx hardhat test
```

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 📞 연락처

- **프로젝트 링크**: [https://github.com/your-username/donation-service](https://github.com/your-username/donation-service)
- **이슈 리포트**: [https://github.com/your-username/donation-service/issues](https://github.com/your-username/donation-service/issues)

## 🙏 감사의 말

- [React](https://reactjs.org/) - 사용자 인터페이스
- [Node.js](https://nodejs.org/) - 서버 런타임
- [Solidity](https://soliditylang.org/) - 스마트 컨트랙트
- [Prisma](https://www.prisma.io/) - 데이터베이스 ORM
- [Tailwind CSS](https://tailwindcss.com/) - CSS 프레임워크

---

⭐ **이 프로젝트가 도움이 되었다면 스타를 눌러주세요!**
