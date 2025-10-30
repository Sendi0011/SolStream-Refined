import { createAppKit } from '@reown/appkit';
import { base, baseSepolia } from 'wagmi/chains';


const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!;

export const appKit = createAppKit({
  projectId,
  networks: [base, baseSepolia],
  themeMode: 'dark',
});
