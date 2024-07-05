const { 
    Client, 
    AccountId, 
    PrivateKey, 
    TopicCreateTransaction,
    TopicMessageSubmitTransaction,
    AccountBalanceQuery
} = require("@hashgraph/sdk");

export interface TokenBalance {
  tokenId: string;
  balance: bigint;
}

export interface AccountInfo {
  accountId: string;
  balance: number;
  tokenBalances: TokenBalance[];
}

class HederaService {
    private client: InstanceType<typeof Client>;

  constructor() {
    // Initialize the Hedera client
    const myAccountId = AccountId.fromString(process.env.HEDERA_ACCOUNT_ID);
    const myPrivateKey = PrivateKey.fromString(process.env.HEDERA_PRIVATE_KEY);

    this.client = Client.forTestnet();
    this.client.setOperator(myAccountId, myPrivateKey);
  }

  async createTopic() {
    const transaction = new TopicCreateTransaction();
    const txResponse = await transaction.execute(this.client);
    const receipt = await txResponse.getReceipt(this.client);
    const topicId = receipt.topicId;
    return topicId.toString();
  }

  async submitMessage(topicId: any, message: any) {
    console.log(`submitMessage called. TopicId: ${topicId} , Message: ${message}`);
    const transaction = new TopicMessageSubmitTransaction({
      topicId: topicId,
      message: message
    });

    const txResponse = await transaction.execute(this.client);
    const receipt = await txResponse.getReceipt(this.client);
    return receipt.status.toString();
  }

  async getAccountBalance(accountId: string): Promise<number> {
    try {
      const balance = await new AccountBalanceQuery()
        .setAccountId(accountId)
        .execute(this.client);

      return balance.hbars.toTinybars().toNumber();
    } catch (error) {
      console.error("Error querying account balance:", error);
      throw error;
    }
  }

  async getAccountInfo(accountId: string): Promise<{
    accountId: string;
    balance: number;
    tokenBalances: TokenBalance[];
  }> {
    try {
      const query = new AccountBalanceQuery().setAccountId(accountId);
      const accountBalance = await query.execute(this.client);

      return {
        accountId: accountId,
        balance: accountBalance.hbars.toTinybars().toNumber(),
        tokenBalances: accountBalance.tokens._map,
      };
    } catch (error) {
      console.error("Error querying account info:", error);
      throw error;
    }
  }

  // Add more methods for other Hedera operations...
}

export const hederaService = new HederaService();