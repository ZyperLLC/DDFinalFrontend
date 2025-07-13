import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { UserContext } from '../Context/UserContextProvider';
import { useTonConnectUiContext } from '../Context/TonConnectUiContext';
import { retrieveLaunchParams } from '@telegram-apps/sdk';
import { User } from '../types';
import { useUser } from '../hooks/useUser';
import { useGetCredits } from '../hooks/useGetCredits';

interface ConnectButtonProps {
  variant?: 'walletCard';
}

export const ConnectButton: React.FC<ConnectButtonProps> = ({ variant }) => {
  const { t } = useTranslation();
  const { tgWebAppData } = retrieveLaunchParams();
  const { tonConnectUI: tonConnectUiInstance } = useTonConnectUiContext();
  const context = useContext(UserContext);

  const [address, setAddress] = useState<string | null>(
    tonConnectUiInstance?.account?.address ?? null
  );

  const { register, fetchUser, error } = useUser();
  const { fetchNFTs } = useGetCredits();

  const fetchDolphinCredits = async (address: string) => {
    let finfatherNft = 0;
    let hasFinFather = false;
    if (address) {
      const nfts = await fetchNFTs(address);
      if (nfts.length <= 0) return { hasNft: false, hasFinFather: false };
      for (const nft of nfts) {
        if (nft.metadata?.name?.toLowerCase().includes('finfather')) {
          hasFinFather = true;
          finfatherNft++;
        }
      }
      return {
        hasNft: true,
        hasFinFather,
        finfatherNft,
        totalNfts: nfts.length - finfatherNft,
      };
    }
  };

  const checkRegisteredUser = async (address: string) => {
    if (!address || address.trim() === '') return;
    try {
      let creditBalance = 0;
      if (tgWebAppData?.user?.id && tgWebAppData.user?.username) {
        const userData = await fetchUser(tgWebAppData?.user?.id.toString());

        if (userData != undefined) {
          toast.success(t('welcome_back', { name: userData?.username }));
        } else {
          const nft = await fetchDolphinCredits(address);
          if (nft?.hasNft) {
            creditBalance = nft?.hasFinFather
              ? (nft.finfatherNft ?? 1) * 18.51
              : (nft.totalNfts ?? 1) * 4.5;
          }

          const newUser: Partial<User> = {
            telegramId: tgWebAppData?.user?.id.toString(),
            walletAddress: address,
            username: tgWebAppData?.user?.username,
            creditBalance: creditBalance ?? 0,
          };
          await register(newUser);

          toast.success(t('user_registered'));
        }

        context?.setTelegramId(tgWebAppData?.user?.id.toString());
        context?.setWalletAddress(address);
        context?.setTonBalance(userData?.tonBalance ?? BigInt(0));
        context?.setCreditBalance(userData?.creditBalance ?? creditBalance);
      }
    } catch {
      console.error(error);
      toast.error(t('fetch_user_failed'));
    }
  };

  useEffect(() => {
    if (tonConnectUiInstance) {
      const unsubscribe = tonConnectUiInstance.onStatusChange(async (wallet) => {
        try {
          if (wallet) {
            setAddress(wallet?.account.address);
            toast.success(t('wallet_connected'));
            checkRegisteredUser(wallet?.account.address);
          }
        } catch (err) {
          console.log(err);
          toast.error(t('error_occurred'));
        }
      });

      checkRegisteredUser(tonConnectUiInstance?.account?.address ?? '');
      return () => unsubscribe();
    }
  }, [tonConnectUiInstance]);

  const openModal = async () => {
    if (tonConnectUiInstance) {
      await tonConnectUiInstance.openModal();
    } else {
      toast.error(t('open_modal_failed'));
    }
  };

  const disconnectModal = async () => {
    if (tonConnectUiInstance) {
      await tonConnectUiInstance.disconnect();
      toast.success(t('wallet_disconnected'));
      setAddress(null);
      context?.resetUser();
    }
  };

  const isWalletCard = variant === 'walletCard';
  const isConnected = !!address;

  const buttonStyle: React.CSSProperties = {
    padding: '12px 20px',
    borderRadius: '8px',
    fontWeight: 600,
    fontSize: '1rem',
    border: isWalletCard && isConnected ? '1px solid #2563eb' : 'none',
    backgroundColor: isWalletCard && isConnected ? '#ffffff' : isWalletCard ? '#2563eb' : '#333',
    color: isWalletCard && isConnected ? '#2563eb' : '#ffffff',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  };

  return (
    <div>
      {!isConnected ? (
        <button style={buttonStyle} onClick={openModal}>
          {tonConnectUiInstance ? t('connect_wallet') : t('loading')}
        </button>
      ) : (
        <button style={buttonStyle} onClick={disconnectModal}>
          {address.substring(2, 6).toUpperCase()}...
          {address.substring(address.length - 10).toUpperCase()}
        </button>
      )}
    </div>
  );
};
