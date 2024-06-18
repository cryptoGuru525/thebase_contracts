import { ethers } from "hardhat";
const utils = require("../scripts/utils");

import { config } from "./config";

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("deployer address:", deployer.address);
    const factory = await ethers.getContractAt("PancakeFactory", config.factory);
    const token = await utils.deployAndVerify("BFARMToken", []);

    await token.mint(config.feeAddress, ethers.utils.parseEther("5000"));

    // const bfarmwethPair = await factory.getPair(config.weth, token.address);
    

    console.log({
        token: token.address,
        // bfarmwethPair: bfarmwethPair,
        // usdcWethPair: usdcWethPair,
    });
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
