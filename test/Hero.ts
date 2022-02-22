import "@nomiclabs/hardhat-ethers";
import { expect } from "chai";
import {ethers} from "hardhat";

describe("Hero", function() {
    async function createHero() {
    const Hero = await ethers.getContractFactory("Hero");
    const hero = await Hero.deploy();
    await hero.deployed();

    return hero;
}
let hero;
before(async function(){
    hero = await createHero();
});
it("SHOULD FAIL AT CREATE HERO CAUSE OF PAYMENT", async function () {
    let e;
    try{
        await hero.createHero(0, {
            value: ethers.utils.parseEther("0.4999999")
        })
    }
    catch(err){
        e= err;
    }
    expect(e.message.includes("Please send more money")).to.equal(true);
})
});