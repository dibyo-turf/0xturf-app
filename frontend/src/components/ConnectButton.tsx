import { ConnectButton } from "@rainbow-me/rainbowkit";
import MetamaskLogo from "../assets/icons/metamask-icon.png";

import Button from "./button";
export const ConnectWalletButton = () => {
    return (
        <ConnectButton.Custom>
            {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                authenticationStatus,
                mounted,
            }) => {
                // Note: If your app doesn't use authentication, you
                // can remove all 'authenticationStatus' checks
                const ready = mounted && authenticationStatus !== "loading";
                const connected =
                    ready &&
                    account &&
                    chain &&
                    (!authenticationStatus ||
                        authenticationStatus === "authenticated");
                return (
                    <div
                        {...(!ready && {
                            "aria-hidden": true,
                            style: {
                                opacity: 0,
                                pointerEvents: "none",
                                userSelect: "none",
                            },
                        })}
                    >
                        {(() => {
                            if (!connected) {
                                return (
                                    <Button
                                        variant="ghost"
                                        className="w-full"
                                        onClick={openConnectModal}
                                    >
                                        <img
                                            src={MetamaskLogo}
                                            alt="metmask"
                                            className="mr-4 w-[20px] h-[20px]"
                                        />
                                        Connect with metamask
                                    </Button>
                                );
                            }
                            if (chain.unsupported) {
                                return (
                                    <Button variant="ghost" className="w-full">
                                        Wrong network
                                    </Button>
                                );
                            }
                            return (
                                <div>
                                    <Button
                                        className="w-full flex items-center"
                                        onClick={openAccountModal}
                                        variant="ghost"
                                    >
                                        {chain.hasIcon && (
                                            <div
                                                style={{
                                                    background:
                                                        chain.iconBackground,
                                                    width: 24,
                                                    height: 24,
                                                    borderRadius: 999,
                                                    overflow: "hidden",
                                                    marginRight: 6,
                                                }}
                                            >
                                                {chain.iconUrl && (
                                                    <img
                                                        alt={
                                                            chain.name ??
                                                            "Chain icon"
                                                        }
                                                        src={chain.iconUrl}
                                                        style={{
                                                            width: 24,
                                                            height: 24,
                                                        }}
                                                    />
                                                )}
                                            </div>
                                        )}
                                        {account.displayName}
                                    </Button>
                                    {/* <button
                                        
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                        type="button"
                                    >
                                        
                                        {chain.name}
                                    </button>
                                    <button
                                        onClick={openAccountModal}
                                        type="button"
                                    >
                                        {account.displayName}
                                        {account.displayBalance
                                            ? ` (${account.displayBalance})`
                                            : ""}
                                    </button> */}
                                </div>
                            );
                        })()}
                    </div>
                );
            }}
        </ConnectButton.Custom>
    );
};
