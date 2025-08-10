import { ethers } from 'hardhat';

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log('Deploying with:', await deployer.getAddress());

  const DonationToken = await ethers.getContractFactory('DonationToken');
  const token = await DonationToken.deploy();
  await token.waitForDeployment();
  console.log('DonationToken:', await token.getAddress());

  const DonationPool = await ethers.getContractFactory('DonationPool');
  const pool = await DonationPool.deploy(await token.getAddress());
  await pool.waitForDeployment();
  console.log('DonationPool:', await pool.getAddress());

  // Grant allowance to pool for deployer for quick test
  await (await token.mint(await deployer.getAddress(), 1_000_000)).wait();
  await (await token.approve(await pool.getAddress(), 1_000_000)).wait();
  console.log('Minted and approved initial supply for testing');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});


