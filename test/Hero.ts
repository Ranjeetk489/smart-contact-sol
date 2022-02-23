import "@nomiclabs/hardhat-ethers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Hero", function () {
    async function createHero() {
        const Hero = await ethers.getContractFactory("TestHero");
        const hero = await Hero.deploy();
        await hero.deployed();

        return hero;
    }
    let hero;
    before(async function () {
        hero = await createHero();
    });
    it("should get a zero hero array.", async function () {
        expect(await hero.getHeroes()).to.deep.equal([]);
    })
    it("SHOULD FAIL AT CREATE HERO CAUSE OF PAYMENT", async function () {
        const hero = await createHero();

        await hero.setRandom(69);
        await hero.createHero(0, {
        });
        const heroes = (await hero.getHeroes())[0];
        expect(await hero.getMagic(heroes)).to.equal(16);
    })
});  