import { expect } from "chai";
import { ethers } from "hardhat";
import { BigNumber, Contract } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { CCIPLocalSimulator } from "../typechain-types";
import { CrossChainNameServiceRegister } from "../typechain-types";
import { CrossChainNameServiceReceiver } from "../typechain-types";
import { CrossChainNameServiceLookup } from "../typechain-types";


describe("CrossChainNameService", function () {
  let ccipLocalSimulator: CCIPLocalSimulator;
  let crossChainNameServiceRegister: CrossChainNameServiceRegister;
  let crossChainNameServiceReceiver: CrossChainNameServiceReceiver;
  let crossChainNameServiceLookup: CrossChainNameServiceLookup;
  let owner: SignerWithAddress;
  let alice: SignerWithAddress;
  let bob: SignerWithAddress;
  let sourceChainSelector: BigNumber;
  let sourceRouter: string;
  let destinationRouter: string;
  const FAUCET_AMOUNT = 10 * 10 ** 18;

  beforeEach(async function () {
    const signers = await ethers.getSigners();
    owner = signers[0];
    alice = signers[1];
    bob = signers[2];

    // Create an instance of CCIPLocalSimulator.sol smart contract.
    const CCIPLocalSimulator = await ethers.getContractFactory(
      "CCIPLocalSimulator"
    );
    ccipLocalSimulator = await CCIPLocalSimulator.deploy();
    console.log("CCIPLocalSimulator deployed to:", ccipLocalSimulator.address);

    // Call the configuration() function to get Router contract address.
    const { 
        chainSelector_,
        sourceRouter_, destinationRouter_ } =
      await ccipLocalSimulator.configuration();
    sourceChainSelector = chainSelector_;
    sourceRouter = sourceRouter_;
    destinationRouter = destinationRouter_;
    console.log("sourceChainSelector:", sourceChainSelector);
    console.log("sourceRouter:", sourceRouter);
    console.log("destinationRouter:", destinationRouter);

    // Request LINK token from faucet
    // await ccipLocalSimulator.requestLinkFromFaucet(owner.address, FAUCET_AMOUNT);
    // await ccipLocalSimulator.requestLinkFromFaucet(alice.address, FAUCET_AMOUNT);
    // await ccipLocalSimulator.requestLinkFromFaucet(bob.address, FAUCET_AMOUNT);

    // Create instances of CrossChainNameServiceRegister.sol, CrossChainNameServiceReceiver.sol and CrossChainNameServiceLookup.sol smart contracts and call the enableChain() function where needed.
    const CrossChainNameServiceLookup = await ethers.getContractFactory(
        "CrossChainNameServiceLookup",
        { signer: owner }
    );
    crossChainNameServiceLookup = await CrossChainNameServiceLookup.deploy();
    console.log("CrossChainNameServiceLookup deployed to:", crossChainNameServiceLookup.address);
    const CrossChainNameServiceRegister = await ethers.getContractFactory(
      "CrossChainNameServiceRegister",
    );
    crossChainNameServiceRegister = await CrossChainNameServiceRegister.deploy(sourceRouter, crossChainNameServiceLookup.address);
    console.log("CrossChainNameServiceRegister deployed to:", crossChainNameServiceRegister.address);
    console.log("crossChainNameServiceRegister owner:", await crossChainNameServiceRegister.owner());
    // const CrossChainNameServiceReceiver = await ethers.getContractFactory(
    //     "CrossChainNameServiceReceiver",
    //     { signer: owner }
    // );
    // crossChainNameServiceReceiver = await CrossChainNameServiceReceiver.deploy(destinationRouter, crossChainNameServiceLookup.address, sourceChainSelector);
    // console.log("CrossChainNameServiceReceiver deployed to:", crossChainNameServiceReceiver.address);

    // const gasLimit = 5000_000; // manual gas limit (increase if needed)
    // // Call the enableChain() function of the CrossChainNameServiceRegister.sol smart contract instance and provide the sourceChainSelector and sourceRouter as function arguments.
    // await crossChainNameServiceRegister.enableChain(sourceChainSelector, crossChainNameServiceReceiver.address, gasLimit, { from: owner.address });

    // Call the setCrossChainNameServiceAddress function of the CrossChainNameServiceLookup.sol smart contract "source" instance and provide the address of the CrossChainNameServiceRegister.sol smart contract instance. 
    await crossChainNameServiceLookup.connect(owner).setCrossChainNameServiceAddress(crossChainNameServiceRegister.address);
    console.log("Did the 1 transactions succeed?");
    
    // Repeat the process for the CrossChainNameServiceLookup.sol smart contract "receiver" instance and provide the address of the CrossChainNameServiceReceiver.sol smart contract instance.
    // await crossChainNameServiceLookup.setCrossChainNameServiceAddress(crossChainNameServiceReceiver.address, { from: owner.address });

    // Call the register() function and provide “alice.ccns” and Alice’s EOA address as function arguments.
    // TODO: Check if the below function needs to be called by alice instead on crossChainNameServiceRegister contract
    await crossChainNameServiceRegister.connect(alice).register("alice.ccns");
    console.log("Did the 2 transactions succeed?");

    // Call the lookup() function and provide “alice.ccns” as a function argument. Assert that the returned address is Alice’s EOA address.
    const aliceAddress = await crossChainNameServiceLookup.lookup("alice.ccns");
    console.log("aliceAddress:", aliceAddress);
    console.log("alice:", await alice.getAddress());
  });

  describe("Register and Lookup", function () {
    it("Should register ccns name of the user", async function () {
        console.log("alice:", await alice.getAddress());
    });

    // it("Should fetch alice's address when registered the ccns name", async function () {
    //   const ownerBalance = await token.balanceOf(owner.address);
    //   expect(await token.totalSupply()).to.equal(ownerBalance);
    // });
  });

  
});
