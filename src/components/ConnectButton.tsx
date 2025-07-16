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

      {/* Disconnect Confirmation Modal */}
      {showModal && (
        <>
          <div
            className="fixed inset-0 z-40 backdrop-blur-md"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
            onClick={() => setShowModal(false)}
          />

          <div
            className="fixed left-0 right-0 z-50 flex justify-center px-4"
            style={{ bottom: '64px', pointerEvents: 'none' }}
          >
            <div
              className="w-full max-w-md rounded-2xl p-6 text-center bg-white"
              style={{
                pointerEvents: 'auto',
                boxShadow: '0 0 20px rgba(0,0,0,0.15)',
                margin: '0 auto',
                padding: '5px 20px 20px',
                maxWidth: '280px',
                borderRadius: '7px',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute"
                style={{
                  top: '0px',
                  right: '0px',
                  padding: '10px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <X size={18} color="#333" />
              </button>

              <h2 className="text-xl font-bold mb-2 text-[#7b3fe4]">Disconnect Wallet</h2>
              <p className="text-sm mb-6 text-[#7b3fe4]">
                Are you sure you want to disconnect? You’ll need to reconnect to stake, play, or receive rewards.
              </p>

              <button
                onClick={disconnectWallet}
                className="w-[90%] max-w-[300px] mx-auto py-4 rounded-xl text-white font-semibold mt-4"
                style={{
                  background: 'linear-gradient(to right, #f72585, #7209b7)',
                  height: '36px',
                  display: 'block',
                  color: '#ffffff',
                  borderRadius: '7px',
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
