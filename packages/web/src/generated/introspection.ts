export interface PossibleTypesResultData {
  possibleTypes: {
    [key: string]: string[];
  };
}
const result: PossibleTypesResultData = {
  possibleTypes: {
    Node: ['Amount', 'BodyPart', 'Dope', 'Hustler', 'Item', 'Listing', 'Wallet', 'WalletItems'],
    SearchResult: ['Dope', 'Hustler', 'Item'],
    Token: ['Dope', 'Hustler', 'Item'],
  },
};
export default result;
