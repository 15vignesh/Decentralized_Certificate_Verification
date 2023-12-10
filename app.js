document.addEventListener('DOMContentLoaded',async function(){
    const web3=new Web3(new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545'));
    const contractaddress="0x91245fC3E838115Cd6Bf6F1448432207846562dd";
    const ABI=[{
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "Recipient",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "RecipientName",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "CourseName",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "IssuedBy",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "CompletionDate",
          "type": "uint256"
        }
      ],
      "name": "CertificateIssued",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "certificates",
      "outputs": [
        {
          "internalType": "string",
          "name": "RecipientName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "CourseName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "IssuedBy",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "CompletionDate",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "Issued",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "isOwner",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "Recipient",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "RecipientName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "CourseName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "IssuedBy",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "CompletionDate",
          "type": "uint256"
        }
      ],
      "name": "GenerateCertificate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "Recipient",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "RecipientName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "CourseName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "IssuedBy",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "CompletionDate",
          "type": "uint256"
        }
      ],
      "name": "VerifyCertificate",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }];
    const contract=new web3.eth.Contract(ABI,contractaddress);
    //function for generate Certificate
    window.generateCertificate=async function(){
        const recipientAddress=document.getElementById('recipientAddress').value;
        const recipientName=document.getElementById('recipientName').value;
        const courseName=document.getElementById("courseName").value;
        const issuedBy=document.getElementById('issuedBy').value;
        const completionDateInput=document.getElementById('completionDate').value;
        const completionDateParts=completionDateInput.split('-');
        const formatDate=completionDateParts.reverse().join("");
        const completionDate=parseInt(formatDate);

        const accounts=await web3.eth.getAccounts();
        try{
            await contract.methods.GenerateCertificate(
                recipientAddress,recipientName,courseName,issuedBy,completionDate
            ).send({from:accounts[0],gas: 2000000});
            const viewLink = document.createElement('a');
            viewLink.href = `/CertificateTemplate.html?recipientAddress=${recipientAddress}&recipientName=${recipientName}&courseName=${courseName}&issuedBy=${issuedBy}&completionDate=${completionDate}`;
            viewLink.textContent = 'View Certificate';
            document.body.appendChild(viewLink);
        alert("Certificate Generated Successfully! Click the link to view your certificate.");
        }
        catch(error){
            console.error("Error While Generating Certificate:",error);
            alert("Error Occurred Try Again");
        }
    };

    //for verify
    window.verifyCertificate=async function(){
        const verifyrecipientAddress=document.getElementById('verifyRecipientAddress').value;
        const verifyrecipientName=document.getElementById('verifyRecipientName').value;
        const verifycourseName=document.getElementById("verifyCourseName").value;
        const verifyissuedBy=document.getElementById('verifyIssuedBy').value;
        const vcompletionDateInput=document.getElementById('verifyCompletionDate').value;
        const vcompletionDateParts=vcompletionDateInput.split('-');
        const vformatDate=vcompletionDateParts.reverse().join("");
        const verifycompletionDate=parseInt(vformatDate);

        try{
            const result=await contract.methods.VerifyCertificate(
                verifyrecipientAddress,verifyrecipientName,verifycourseName,verifyissuedBy,verifycompletionDate
            ).call();
            if(result){
                alert("Certificate is Valid!");
            }
            else{
                alert("Certificate is Invalid");
            }
        }
        catch(error){
            console.error("Error verifying certificate:", error);
            alert("Error verifying certificate. See console for details");
        }
    }
})