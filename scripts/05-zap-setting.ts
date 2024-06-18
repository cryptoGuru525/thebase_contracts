import { ethers } from "hardhat";

import { config } from "./config";

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("deployer address:", deployer.address);
    const zapper = await ethers.getContractAt("ZapV3", config.zap);

    await zapper.setCoreValues(
        config.router,
        config.factory,
        config.bfarm,
        config.baseLp,
        config.weth
    );

    // weth - bfarm
    console.log("set swap path for weth-bfarm");
    await zapper.setSwapPath(config.bfarm, config.weth, [config.bfarm, config.weth]);
    await zapper.setSwapPath(config.weth, config.bfarm, [config.weth, config.bfarm]);


    console.log({
        zapper: zapper.address,
    });
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
