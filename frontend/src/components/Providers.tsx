import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import React, { ComponentProps } from "react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient } = configureChains(
  [polygonMumbai],
  [publicProvider()]
);

const appInfo = {
  appName: "Turf",
  projectId: "103333b30405efc424b73b939a369d24",
  chains,
};

const { connectors } = getDefaultWallets(appInfo);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

const Providers: React.FC<ComponentProps<"div">> = (props) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        modalSize="compact"
        initialChain={polygonMumbai}
        showRecentTransactions
        appInfo={appInfo}
        chains={chains}
        theme={darkTheme({
          accentColor: "#7b3fe4",
          accentColorForeground: "white",
          borderRadius: "small",
          fontStack: "system",
          overlayBlur: "small",
        })}
      >
        {props.children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default Providers;
