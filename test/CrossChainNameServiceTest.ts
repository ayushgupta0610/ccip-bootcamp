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
  let lookupDestinationChain: CrossChainNameServiceLookup;
  let owner: SignerWithAddress;
  let alice: SignerWithAddress;
  let bob: SignerWithAddress;
  let sourceChainSelector: BigNumber;
  let sourceRouter: string;
  let destinationRouter: string;
  const FAUCET_AMOUNT = 10 * 10 ** 18;
  const ZERO_ADDRESS = ethers.constants.AddressZero;

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
    
    // Call the setCrossChainNameServiceAddress function of the CrossChainNameServiceLookup.sol smart contract "source" instance and provide the address of the CrossChainNameServiceRegister.sol smart contract instance. 
    await crossChainNameServiceLookup.connect(owner).setCrossChainNameServiceAddress(crossChainNameServiceRegister.address);

    const LookupDestinationChain = await ethers.getContractFactory(
        "CrossChainNameServiceLookup",
        { signer: owner }
    );
    lookupDestinationChain = await LookupDestinationChain.deploy();
    console.log("lookupDestinationChain deployed to:", lookupDestinationChain.address);

    const CrossChainNameServiceReceiver = await ethers.getContractFactory(
        "CrossChainNameServiceReceiver",
        { signer: owner }
    );
    crossChainNameServiceReceiver = await CrossChainNameServiceReceiver.deploy(destinationRouter, lookupDestinationChain.address, sourceChainSelector);
    console.log("CrossChainNameServiceReceiver deployed to:", crossChainNameServiceReceiver.address);

    // Call the setCrossChainNameServiceAddress function of the CrossChainNameServiceLookup.sol smart contract "source" instance and provide the address of the CrossChainNameServiceRegister.sol smart contract instance. 
    await lookupDestinationChain.connect(owner).setCrossChainNameServiceAddress(crossChainNameServiceReceiver.address);
    
  });

  describe("Register and lookup on the same chain", function () {
    it("Should fetch alice's address when registered the ccns name", async function () {
      
        // Call the register() function and provide “alice.ccns” and Alice’s EOA address as function arguments.
        await crossChainNameServiceRegister.connect(alice).register("alice.ccns");

        // Call the lookup() function and provide “alice.ccns” as a function argument. Assert that the returned address is Alice’s EOA address.
        const aliceAddress = await crossChainNameServiceLookup.lookup("alice.ccns");
        const aliceAddressOnDestinationChain = await lookupDestinationChain.lookup("alice.ccns");

        expect(aliceAddress).to.equal(await alice.getAddress());
        expect(aliceAddressOnDestinationChain).to.equal(ZERO_ADDRESS);
    });
  });

  describe("Register and lookup on the receiver chain", function () {
    it("Should fetch alice's address when sent cross chain", async function () {

      const gasLimit = 5000_000; // manual gas limit (increase if needed)
      // Call the enableChain() function of the CrossChainNameServiceRegister.sol smart contract instance
      await crossChainNameServiceRegister.connect(owner).enableChain(sourceChainSelector, crossChainNameServiceReceiver.address, gasLimit);

      // Call the register() function and provide “alice.ccns” and Alice’s EOA address as function arguments.
      await crossChainNameServiceRegister.connect(alice).register("alice.ccns");

      // Call the lookup() function and provide “alice.ccns” as a function argument. Assert that the returned address is Alice’s EOA address.
      const aliceAddress = await crossChainNameServiceLookup.lookup("alice.ccns");
      const aliceAddressOnDestinationChain = await lookupDestinationChain.lookup("alice.ccns");

      expect(aliceAddress).to.equal(await alice.getAddress());
      expect(aliceAddressOnDestinationChain).to.equal(await alice.getAddress());
    });
  });

  
});
