const { ethers } = require("ethers");
const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


rl.question("请输入要生成的钱包数量: ", (num) => {
    const walletCount = parseInt(num);
    if (isNaN(walletCount) || walletCount <= 0) {
        console.log("请输入一个有效的正整数！");
        rl.close();
        return;
    }
    const wallets = [];
    for (let i = 0; i < walletCount; i++) {
        const wallet = ethers.Wallet.createRandom();
        const walletData = `${wallet.address}----${wallet.privateKey}`;
        wallets.push(walletData);
        console.log(`已生成第 ${i + 1} 个钱包`);
    }

    const output = wallets.join("\r\n");
    fs.writeFileSync(`${walletCount}wallets.txt`, output, "utf8");

    console.log(`成功生成 ${walletCount} 个钱包，已保存到 wallets.txt`);
    rl.close();
});