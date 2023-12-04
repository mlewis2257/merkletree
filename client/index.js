const axios = require("axios");
const niceList = require("../utils/niceList.json");
const { sha256 } = require("ethereum-cryptography/sha256");
const { utf8ToBytes } = require("ethereum-cryptography/utils");
const MerkleTree = require("../utils/MerkleTree");
const verifyProof = require("../utils/verifyProof");

const serverUrl = "http://localhost:1225";

async function main() {
  // TODO: how do we prove to the server we're on the nice list?
  const leaves = niceList;
  const merkleTree = new MerkleTree(leaves);
  const merkleRoot = merkleTree.getRoot();
  console.log(merkleRoot);

  const yourName = "Merle Fisher";

  const index = leaves.findIndex((n) => n === yourName);
  const proof = merkleTree.getProof(index);
  // verifyProof(proof, index, merkleRoot);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    name: yourName,
    proof: verifyProof(yourName, index, merkleRoot),
  });
  console.log({ gift });
}

main();
