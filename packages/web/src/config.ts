// Types
type IConfig = {
  decimals: number;
  airdrop: Record<string, number>;
};

// Config from generator
const config: IConfig = {
  decimals: 0,
  airdrop: {
    '0x016C8780e5ccB32E5CAA342a926794cE64d9C364': 5,
    '0x185a4dc360ce69bdccee33b3784b0282f7961aea': 10,
  },
};

// Export config
export default config;
