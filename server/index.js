const express = require("express");
const MerkleTree = require("../utils/MerkleTree");
const verifyProof = require("../utils/verifyProof");
const list = require("../utils/niceList.json");

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
const merkleTree = new MerkleTree(list);
const merkleRoot = merkleTree.getRoot();

// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT = `${merkleRoot}`;

app.post("/gift", (req, res) => {
  // grab the parameters from the front-end here
  const body = req.body;

  // TODO: prove that a name is in the list
  const isInTheList = false;
  if (!isInTheList) {
    verifyProof(body);
    res.send("You got a toy robot!");
  } else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
