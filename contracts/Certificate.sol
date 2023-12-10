// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract CertificateGeneration {
    struct Certificate {
        string RecipientName;
        string CourseName;
        string IssuedBy;
        uint256 CompletionDate;
        bool Issued;
    }
    mapping(address => Certificate) public certificates;
    address public owner;
    constructor() 
    {
        owner = msg.sender;
    }
    modifier OnlyOwner() {
        require(isOwner(), "Only Owner Can Perform This Operation");
        _;
    }
    function isOwner() public view returns (bool) {
        return msg.sender == owner;
    }
    event CertificateIssued(address indexed Recipient,string RecipientName,string CourseName,string IssuedBy,uint256 CompletionDate);
    function GenerateCertificate(address Recipient,string memory RecipientName,string memory CourseName,string memory IssuedBy,uint256 CompletionDate) external OnlyOwner {
        require(!certificates[Recipient].Issued, "Certificate Already Issued");
        certificates[Recipient] = Certificate({
            RecipientName: RecipientName,
            CourseName: CourseName,
            IssuedBy: IssuedBy,
            CompletionDate: CompletionDate,
            Issued: true
        });
        emit CertificateIssued(Recipient, RecipientName, CourseName, IssuedBy, CompletionDate);
    }
    function VerifyCertificate(address Recipient,string memory RecipientName,string memory CourseName,string memory IssuedBy,uint256 CompletionDate) external view returns (bool) {
        Certificate memory certificate = certificates[Recipient];
        return (
           certificate.Issued && 
            keccak256(abi.encodePacked(certificate.RecipientName))==keccak256(abi.encodePacked(RecipientName)) &&
            keccak256(abi.encodePacked(certificate.CourseName))==keccak256(abi.encodePacked(CourseName)) &&
            keccak256(abi.encodePacked(certificate.IssuedBy))==keccak256(abi.encodePacked(IssuedBy)) &&
            certificate.CompletionDate==CompletionDate
        );
    }
}
