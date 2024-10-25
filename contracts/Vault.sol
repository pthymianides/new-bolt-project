// SPDX-License-Identifier: MIT
    pragma solidity ^0.8.0;

    import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
    import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
    import "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";
    import "@openzeppelin/contracts/access/Ownable.sol";
    import "@openzeppelin/contracts/utils/math/SafeMath.sol";

    contract Vault is IERC1155Receiver, Ownable {
        using SafeMath for uint256;

        IERC20 public underlying;
        IERC1155 public underlying1155;

        mapping(address => uint256) private balances;

        constructor(IERC20 _underlying, IERC1155 _underlying1155) {
            underlying = _underlying;
            underlying1155 = _underlying1155;
        }

        function deposit(uint256 amount) external {
            underlying.transferFrom(msg.sender, address(this), amount);
            balances[msg.sender] = balances[msg.sender].add(amount);
        }

        function deposit(uint256 id, uint256 amount) external {
            underlying1155.safeTransferFrom(msg.sender, address(this), id, amount, "");
            balances[msg.sender] = balances[msg.sender].add(amount);
        }

        function withdraw(uint256 amount) external {
            require(balances[msg.sender] >= amount, "Insufficient balance");
            underlying.transfer(msg.sender, amount);
            balances[msg.sender] = balances[msg.sender].sub(amount);
        }

        function withdraw(uint256 id, uint256 amount) external {
            require(balances[msg.sender] >= amount, "Insufficient balance");
            underlying1155.safeTransferFrom(address(this), msg.sender, id, amount, "");
            balances[msg.sender] = balances[msg.sender].sub(amount);
        }

        function balanceOf(address account) external view returns (uint256) {
            return balances[account];
        }

        function onERC1155Received(address, address, uint256, uint256, bytes memory) external returns (bytes4) {
            return this.onERC1155BatchReceived.selector;
        }

        function onERC1155BatchReceived(address, address, uint256[] memory, uint256[] memory, bytes memory) external {
            // Handle batch transfers if needed
        }
    }
