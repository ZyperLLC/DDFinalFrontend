import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';

import { UserContext } from '../Context/UserContextProvider';
import { useTonConnectUiContext } from '../Context/TonConnectUiContext';
import { retrieveLaunchParams } from '@telegram-apps/sdk';
import { Bet, User } from '../types';
import { useUser } from '../hooks/useUser';
import { useGetCredits } from '../hooks/useGetCredits';
import { addFriend } from '../api/userApi';
import { Address } from '@ton/ton';

type ConnectButtonProps = {
  whiteBg?: boolean;
};

export const ConnectButton = ({ whiteBg = false }: ConnectButtonProps) => {
  const { t } = useTranslation();
  const { tgWebAppData, tgWebAppStartParam } = retrieveLaunchParams();

  const { tonConnectUI: tonConnectUiInstance } = useTonConnectUiContext();
  const context = useContext(UserContext);

  const [address, setAddress] = useState<string | null>(
    tonConnectUiInstance?.account?.address ?? null
  );

  const [showModal, setShowModal] = useState(false);

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
        const userData = await fetchUser(tgWebAppData.user.id.toString());

        if (userData) {
          toast.success('Welcome Back ' + userData?.username);
        } else {
          const nft = await fetchDolphinCredits(address);
          if (nft?.hasNft) {
            creditBalance = nft?.hasFinFather
              ? (nft.finfatherNft ?? 1) * 18.51
              : (nft.totalNfts ?? 1) * 4.5;
            context?.setHoldingNFTs(true);
          } else {
            context?.setHoldingNFTs(false);
          }

          const newUser: Partial<User> = {
            telegramId: tgWebAppData.user.id.toString(),
            walletAddress: address,
            username: tgWebAppData.user.username,
            creditBalance,
          };
          await register(newUser);

          if (tgWebAppStartParam) {
            await addFriend(tgWebAppStartParam.trim(), tgWebAppData.user.username ?? '');
          }

          toast.success('User Registered Successfully');
        }

        context?.setTelegramId(tgWebAppData.user.id.toString());
        context?.setWalletAddress(`${Address.parse(address)}`);
        context?.setTonBalance(userData?.tonBalance ?? BigInt(0));
        context?.setCreditBalance(userData?.creditBalance ?? creditBalance);
        context?.setFriends(userData?.friends);
        context?.setBets(userData?.betsPlace?.sort((a: Bet, b: Bet) => b.betId - a.betId) ?? []);
        context?.setStakedNfts(userData?.stakedNFTs ?? []);
      }
    } catch {
      console.error(error);
      toast.error('Failed to fetch user data');
    }
  };

  useEffect(() => {
    if (tonConnectUiInstance) {
      const unsubscribe = tonConnectUiInstance.onStatusChange(async (wallet) => {
        try {
          if (wallet) {
            setAddress(wallet.account.address);
            toast.success(t('wallet_connected'));
            checkRegisteredUser(wallet.account.address);
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

  const disconnectWallet = async () => {
    if (tonConnectUiInstance) {
      await tonConnectUiInstance.disconnect();
      toast.success(t('wallet_disconnected'));
      setAddress(null);
      context?.resetUser();
      setShowModal(false);
    }
  };

  return (
    <div>
      {!address ? (
        <button
          className="block w-full mt-2 py-3 rounded-[12px] font-semibold connect-wallet-button"
          onClick={openModal}
        >
          {tonConnectUiInstance ? t('connect_wallet') : t('loading')}
        </button>
      ) : (
        <button
          className={`block w-full mt-2 py-3 rounded-[12px] font-semibold connect-wallet-button ${
            whiteBg ? 'bg-white text-blue-600 border border-blue-600' : ''
          }`}
          onClick={() => setShowModal(true)}
        >
          {address.substring(2, 6).toUpperCase()}...
          {address.substring(address.length - 10).toUpperCase()}
        </button>
      )}

      {/* Disconnect Confirmation Modal (drops from top) */}
      {showModal && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-40 bg-black/20"
            onClick={() => setShowModal(false)}
          />

          {/* Modal box */}
          <div className="fixed top-[80px] left-1/2 z-50 w-full max-w-md -translate-x-1/2 px-4 animate-slide-down">
            <div className="bg-white rounded-xl p-6 shadow-lg relative">
              {/* Close Button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-2 p-2"
              >
                <X size={18} color="#333" />
              </button>

              <h2 className="text-xl font-bold mb-2 text-[#7b3fe4]">Disconnect Wallet</h2>
              <p className="text-sm mb-6 text-[#7b3fe4]">
                Are you sure you want to disconnect? You’ll need to reconnect to stake, play, or receive rewards.
              </p>

              <button
                onClick={disconnectWallet}
                className="w-full mx-auto py-3 rounded-xl text-white font-semibold"
                style={{
                  background: 'linear-gradient(to right, #f72585, #7209b7)',
                }}
              >
                Disconnect
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
