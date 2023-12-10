# Decentralized_Certificate_Verification
This is Decentralized certificate registration and verification for generating and verifying certificates on the blockchain. The project involves a combination of front-end development using HTML, JavaScript, and CSS, as well as back-end development using Express.js for the server and Solidity for the smart contract on the Ethereum blockchain.
**Smart Contract:**
The smart contract is deployed on the Ethereum blockchain. It includes functions for generating and verifying certificates, and it emits events when certificates are issued.
The contract stores certificate details, including recipient name, course name, issuer, completion date, and whether the certificate has been issued.
 **Back-end:**
The Express.js server (`Dac.js`) serves static files, such as HTML, CSS, and JavaScript, to the client.
It includes routes for the main application page and the verification page.
**Blockchain Interaction:**
The Web3 library is used in the front-end to connect to a local Ethereum blockchain node.
When a user generates a certificate, the front-end sends a transaction to the smart contract to store the certificate details on the blockchain.
**Certificate Presentation:**
Upon successful generation, the certificate is dynamically created with the user's input and displayed to the user.
The certificate includes a visually appealing layout with rounded corners, a thumbnail image, and relevant details.
**User Experience:**
Users can generate certificates by filling out a form with recipient details.
The generated certificates are stored on the Ethereum blockchain, providing transparency and tamper resistance.
Users can also verify the authenticity of a certificate by providing recipient details and checking the blockchain for verification.
**Certificate Verification:**
Users or any one can verify that the certificates are valid or not by proving their recipientaddress in verification section.
This project showcases the integration of blockchain technology for secure and decentralized certificate generation and verification, providing users with a reliable and transparent system for managing certificates.
