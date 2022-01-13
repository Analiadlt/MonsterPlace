# See your Solidity code for the contract 
# is ok and compile without any error or warning.
compile="npx hardhat compile",
# Write tests to see the smart contract code works 
# as you expect for various situations.
test="npx hardhat test",

# Run local solidity development environment.
# It will set up dummy accounts that you can use to test.
serve="npx hardhat node",
# Upload your Solidity contract code to it 
# before you run the frontend code.
deploy="npx hardhat run scripts/deploy.js --network localhost",

# Run your React frontend code.
npm start