/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  CrossChainNameServiceLookup,
  CrossChainNameServiceLookupInterface,
} from "../../contracts/CrossChainNameServiceLookup";

const _abi = [
  {
    inputs: [],
    name: "AlreadyTaken",
    type: "error",
  },
  {
    inputs: [],
    name: "Unauthorized",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "OwnershipTransferRequested",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "Registered",
    type: "event",
  },
  {
    inputs: [],
    name: "acceptOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "lookup",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "register",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "crossChainNameService",
        type: "address",
      },
    ],
    name: "setCrossChainNameServiceAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b50338060008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160362000087576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016200007e90620002a7565b60405180910390fd5b816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16146200010e576200010d816200011760201b60201c565b5b5050506200033b565b3373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff160362000188576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016200017f9062000319565b60405180910390fd5b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508073ffffffffffffffffffffffffffffffffffffffff1660008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167fed8889f560326eb138920d842192f0eb3dd22b4f139c87a2c57538e05bae127860405160405180910390a350565b600082825260208201905092915050565b7f43616e6e6f7420736574206f776e657220746f207a65726f0000000000000000600082015250565b60006200028f60188362000246565b91506200029c8262000257565b602082019050919050565b60006020820190508181036000830152620002c28162000280565b9050919050565b7f43616e6e6f74207472616e7366657220746f2073656c66000000000000000000600082015250565b60006200030160178362000246565b91506200030e82620002c9565b602082019050919050565b600060208201905081810360008301526200033481620002f2565b9050919050565b610d4f806200034b6000396000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c80631e59c529146100675780636f2aba191461008357806379ba50971461009f5780638da5cb5b146100a9578063f2fde38b146100c7578063f67187ac146100e3575b600080fd5b610081600480360381019061007c91906109d7565b610113565b005b61009d60048036038101906100989190610a33565b61033f565b005b6100a761038b565b005b6100b1610520565b6040516100be9190610a6f565b60405180910390f35b6100e160048036038101906100dc9190610a33565b610549565b005b6100fd60048036038101906100f89190610a8a565b61055d565b60405161010a9190610a6f565b60405180910390f35b6101526040518060400160405280600e81526020017f6d73672e73656e6465723a202573000000000000000000000000000000000000815250336105a6565b6101b36040518060400160405280601b81526020017f735f63726f7373436861696e4e616d65536572766963653a2025730000000000815250600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166105a6565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461023a576040517f82b4290000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff166002836040516102629190610b44565b908152602001604051809103902060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16146102de576040517f303973dc00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b806002836040516102ef9190610b44565b908152602001604051809103902060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050565b610347610642565b80600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461041b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161041290610bb8565b60405180910390fd5b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055503373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a350565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b610551610642565b61055a816106d2565b50565b6002818051602081018201805184825260208301602085012081835280955050505050506000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b61063e82826040516024016105bc929190610c11565b6040516020818303038152906040527f319af333000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050506107fe565b5050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146106d0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106c790610c8d565b60405180910390fd5b565b3373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610740576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161073790610cf9565b60405180910390fd5b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508073ffffffffffffffffffffffffffffffffffffffff1660008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167fed8889f560326eb138920d842192f0eb3dd22b4f139c87a2c57538e05bae127860405160405180910390a350565b60006a636f6e736f6c652e6c6f679050600080835160208501845afa505050565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6108868261083d565b810181811067ffffffffffffffff821117156108a5576108a461084e565b5b80604052505050565b60006108b861081f565b90506108c4828261087d565b919050565b600067ffffffffffffffff8211156108e4576108e361084e565b5b6108ed8261083d565b9050602081019050919050565b82818337600083830152505050565b600061091c610917846108c9565b6108ae565b90508281526020810184848401111561093857610937610838565b5b6109438482856108fa565b509392505050565b600082601f8301126109605761095f610833565b5b8135610970848260208601610909565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006109a482610979565b9050919050565b6109b481610999565b81146109bf57600080fd5b50565b6000813590506109d1816109ab565b92915050565b600080604083850312156109ee576109ed610829565b5b600083013567ffffffffffffffff811115610a0c57610a0b61082e565b5b610a188582860161094b565b9250506020610a29858286016109c2565b9150509250929050565b600060208284031215610a4957610a48610829565b5b6000610a57848285016109c2565b91505092915050565b610a6981610999565b82525050565b6000602082019050610a846000830184610a60565b92915050565b600060208284031215610aa057610a9f610829565b5b600082013567ffffffffffffffff811115610abe57610abd61082e565b5b610aca8482850161094b565b91505092915050565b600081519050919050565b600081905092915050565b60005b83811015610b07578082015181840152602081019050610aec565b60008484015250505050565b6000610b1e82610ad3565b610b288185610ade565b9350610b38818560208601610ae9565b80840191505092915050565b6000610b508284610b13565b915081905092915050565b600082825260208201905092915050565b7f4d7573742062652070726f706f736564206f776e657200000000000000000000600082015250565b6000610ba2601683610b5b565b9150610bad82610b6c565b602082019050919050565b60006020820190508181036000830152610bd181610b95565b9050919050565b6000610be382610ad3565b610bed8185610b5b565b9350610bfd818560208601610ae9565b610c068161083d565b840191505092915050565b60006040820190508181036000830152610c2b8185610bd8565b9050610c3a6020830184610a60565b9392505050565b7f4f6e6c792063616c6c61626c65206279206f776e657200000000000000000000600082015250565b6000610c77601683610b5b565b9150610c8282610c41565b602082019050919050565b60006020820190508181036000830152610ca681610c6a565b9050919050565b7f43616e6e6f74207472616e7366657220746f2073656c66000000000000000000600082015250565b6000610ce3601783610b5b565b9150610cee82610cad565b602082019050919050565b60006020820190508181036000830152610d1281610cd6565b905091905056fea2646970667358221220bb4bea7d92cc19178a5f3071ebf5b725f76c89cec6f6c110e6e72ce25783fc2764736f6c63430008130033";

type CrossChainNameServiceLookupConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CrossChainNameServiceLookupConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class CrossChainNameServiceLookup__factory extends ContractFactory {
  constructor(...args: CrossChainNameServiceLookupConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<CrossChainNameServiceLookup> {
    return super.deploy(
      overrides || {}
    ) as Promise<CrossChainNameServiceLookup>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): CrossChainNameServiceLookup {
    return super.attach(address) as CrossChainNameServiceLookup;
  }
  override connect(signer: Signer): CrossChainNameServiceLookup__factory {
    return super.connect(signer) as CrossChainNameServiceLookup__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CrossChainNameServiceLookupInterface {
    return new utils.Interface(_abi) as CrossChainNameServiceLookupInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): CrossChainNameServiceLookup {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as CrossChainNameServiceLookup;
  }
}
