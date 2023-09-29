// Define a RegisteredUser interface
export interface RegisteredUser {
  decentralizedID: string;
  publicKey: string;
  data: { [key: string]: any };
  metadata: {
    signature: string;
  };
}
