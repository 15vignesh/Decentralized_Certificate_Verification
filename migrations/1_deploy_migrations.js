const Data=artifacts.require("CertificateGeneration");
module.exports=function(deployer){
    deployer.deploy(Data);
}