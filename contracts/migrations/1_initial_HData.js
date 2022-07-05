const Patient = artifacts.require("../contracts/Patient.sol");
const Doctor = artifacts.require("../contracts/Doctor.sol");
const Monitor = artifacts.require("../contracts/Monitor.sol");
const Assign = artifacts.require("../contracts/Assign.sol");

module.exports = function (deployer) {
  deployer.deploy(Patient);
  deployer.deploy(Doctor);
  deployer.deploy(Monitor);
  deployer.deploy(Assign);
};
