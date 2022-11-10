// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import 'base64-sol/base64.sol';
import './HexStrings.sol';

contract ETHTickets is ERC721Enumerable, Ownable {
  using Strings for uint256;
  using HexStrings for uint160;
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  uint16 _myTotalSupply = 0; // max value 65,535
  address _owner;

  uint16 public MAX_SUPPLY = 8999; // max value 65,535
  uint256 public constant vipTicketPrice = 20000000000000000; // 0.02 ETH
  uint256 public constant gaTicketPrice = 10000000000000000; // 0.01 ETH

 mapping (uint256 => bool) public vipTicketHolders;

  constructor() ERC721("ETHTickets", "ETHTX") {
    _tokenIds._value = 999; // start ticket number at 1000
    _owner = msg.sender;
  }

  mapping (uint256 => bytes3) public color;
  uint256 mintDeadline = block.timestamp + 168 hours;

  function totalSupply() view public override returns(uint256) {
    return _myTotalSupply; // gas optimization (otherwise totalSupply() when mint)
  }

  /**
    * @dev Returns the tokens owned by a given wallet. For use mainly on frontend.
    * @param _wallet The wallet to get the tokens of. NEEDS ENUMERABLE
  */
  function walletOfOwner(address _wallet) public view returns (uint256[] memory) {
    uint256 tokenCount = balanceOf(_wallet);

    uint256[] memory tokensId = new uint256[](tokenCount);
    for (uint256 i; i < tokenCount; i++) {
      tokensId[i] = tokenOfOwnerByIndex(_wallet, i);
    }
    return tokensId;
  }

  function contractURI() public pure returns (string memory) {
    string memory image = Base64.encode(bytes(generateCollectionSvg()));

    bytes memory collectionJsonString = bytes(abi.encodePacked(
      '{"name": "ETHTickets",',
      '"description": "ETHTickets is a premier Ethereum Blockchain event. Join friends from all over the world. Your NFT purchase is your ticket to the event!",', 
      '"image": "data:image/svg+xml;base64,',image,'",'
      '"external_link": "https://metamask.io"}'
    ));

    return string(
      abi.encodePacked(
        'data:application/json;base64,',
        Base64.encode(bytes(abi.encodePacked(collectionJsonString)))
      )
    );
  }

  function generateCollectionSvg() internal pure returns (string memory) {
    return string(abi.encodePacked(
      '<svg preserveAspectRatio="xMinYMin meet" viewBox="0 0 35 33" xmlns="http://www.w3.org/2000/svg" style="stroke-linejoin:round;stroke-miterlimit:2;">',
        '<g><text x="10px" y="10px" style="font-size:6px;">ETH</text></g>',
      '</svg>'
    ));
  }

  modifier canMint() {
    require(_myTotalSupply < MAX_SUPPLY, 'All tickets have been minted.');
    require(block.timestamp < mintDeadline, 'Minting period has expired.');
    require(vipTicketPrice == msg.value || gaTicketPrice == msg.value, "Ether value sent is not correct.");
    _; // Underscores used in function modifiers return and continue execution of the decorated function
  }

  function mintNFT() public payable canMint returns (uint256) {
    // canMint happens first or throws

    _tokenIds.increment();
    uint256 id = _tokenIds.current();
    _safeMint(msg.sender, id);

    if (msg.value == vipTicketPrice) {
      vipTicketHolders[id] = true;
    }

    _myTotalSupply++;
    payable(_owner).transfer(msg.value);

    return (id);
  }

  function tokenURI(uint256 id) public view override returns (string memory) {
    require(_exists(id), "not exist");
    string memory name = string(abi.encodePacked('Ticket #', id.toString() ));
    string memory description = string(abi.encodePacked((vipTicketHolders[id] ? "VIP" : "General Admission"), ' access to ETHTickets on DATE_OF_EVENT.'));

    bytes memory tokenJsonString = bytes(abi.encodePacked(
      '{"name": "', name, '","description": "',description,'",', 
      '"external_url": "https://metamask.io/', id.toString(),'",',
      '"attributes": [{"trait_type": "Ticket Type", "value": "', (vipTicketHolders[id] ? "VIP" : "GA"),  '"}],',
      '"owner": "', (uint160(ownerOf(id))).toHexString(20),'",',
      '"image": "',generateNftSvgByTokenId(id),'"}'
    ));

    return string(
      abi.encodePacked(
        'data:application/json;base64,',
        Base64.encode(bytes(tokenJsonString))
      )
    );
  }

  function generateNftSvgByTokenId(uint256 id) public view returns (string memory) {
    return string(abi.encodePacked(
      'data:image/svg+xml;base64,',
      Base64.encode(bytes(abi.encodePacked(
        '<svg preserveAspectRatio="xMinYMin meet" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" style="fill-rule:evenodd;clip-rule:evenodd;user-select: none;">',
          renderNftSvgBottomById(id),
          renderNftSvgTopById(id),
          '<style>.s1{font-family:"BalooDa2-ExtraBold";} .s4{font-family:"BalooDa2-Regular";} .s3{font-size:108px;} .s5{fill:#FFF;} .s2{fill:#FF9200;} .s6{fill:#3C3C3C;} .s7{fill:#532775;} .s8{fill:rgb(215,43,123);}</style>',
        '</svg>'
      ))
    )));
  }

  function renderNftSvgTopById(uint256 id) internal view returns (string memory) {
    return string(abi.encodePacked(
      '<g transform="matrix(1,0,0,1,0,0.177859)"><path class="',(vipTicketHolders[id] ? "s6" : "s7"), '" d="M295,199.822L5,199.822L5,284.988C5,290.416 9.406,294.822 14.834,294.822L285.166,294.822C290.594,294.822 295,290.416 295,284.988L295,199.822Z" style="fill:rgb(76,76,76);"/></g>',
      '<g id="eventName" transform="matrix(1.6679,0,0,1.6679,-21.8104,-54.7608)"><text x="24.056px" y="53.979px" style="font-size:12.791px;">ETH Atlantis</text></g>',
      '<g id="eventDate" transform="matrix(1.6679,0,0,1.6679,-20.606,-38.5316)"><text x="24.056px" y="53.979px" class="s4 s5">2022, Nov 18 / ',(vipTicketHolders[id] ? "VIP" : "GA"),'</text></g>',
      '<g id="cancelled" transform="matrix(1.6679,0,0,1.6679,-20.6542,-25.266)"><text x="24.056px" y="53.979px" class="s4 s8" style="font-size:6.395px;">CANCELLED</text></g>',
      '<g id="eventMessage" transform="matrix(1.6679,0,0,1.6679,-20.8417,86.6168)"><text x="24.056px" y="53.979px" style="font-size:9.593px;">See you in x Days!</text></g>'
    ));
  }
  function renderNftSvgBottomById(uint256 id) internal view returns (string memory) {
    string memory ticketType = vipTicketHolders[id] ? "VIP" : "General Admission";
    return string(abi.encodePacked(
      '<g transform="matrix(0.966539,0,0,0.966539,4.93126,4.90586)"><path class="',(vipTicketHolders[id] ? "s6" : "s7"), '" d="M0.071,201.848L300.111,201.848L300.111,10.272C300.111,4.656 295.552,0.097 289.936,0.097L10.245,0.097C4.63,0.097 0.071,4.656 0.071,10.272L0.071,201.848Z" style="fill:rgb(194,194,194);"/></g>',
      '<g id="ticketNumber" transform="matrix(1.6679,0,0,1.6679,51.9249,163.089)"><text x="25.898px" y="53.979px" class="s1 s3 s5">#',id.toString(),'</text></g>',
      '<g id="ticketType" transform="matrix(1.6679,0,0,1.6679,51.5802,191.5)"><text x="5.566px" y="53.979px" class="s1 s3 s2">',ticketType,'</text></g>'
    ));
  }

}