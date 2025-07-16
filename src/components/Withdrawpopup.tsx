import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTonConnectUiContext } from '../Context/TonConnectUiContext';
import { slideUpFade } from '../utils/animations';
import tonSymbol from '../assets/ton_symbol.jpg';
import { toast } from 'react-hot-toast';

type WithdrawPopupProps = {
  isVisible: boolean;
  onClose: () => void;
};

export default function WithdrawPopup({ isVisible, onClose }: WithdrawPopupProps) {
  const { t } = useTranslation();
  useTonConnectUiContext();

  const [amount, setAmount] = useState('');
  const [confirming, setConfirming] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  useEffect(() => {
    if (!isVisible) {
      setAmount('');
      setConfirming(false);
    }
  }, [isVisible]);

  const handleWithdraw = async () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast.error('Enter a valid amount');
      return;
    }

    setConfirming(true);
  };

  const confirmWithdraw = async () => {
    try {
      setIsWithdrawing(true);
      // simulate withdraw logic
      await new Promise((res) => setTimeout(res, 1500));
      toast.success(`Successfully withdrew ${amount} TON`);
      onClose();
    } catch (err) {
      console.error(err);
      toast.error('Withdrawal failed');
    } finally {
      setIsWithdrawing(false);
      setConfirming(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-start p-4 pt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-0"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            variants={slideUpFade}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative z-10 bg-white rounded-xl p-6 w-full max-w-md mx-auto shadow-lg"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-700 hover:text-black"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-semibold text-center mb-4">{t('Withdraw TON')}</h2>

            {confirming ? (
              <div className="text-center">
                <p className="mb-4 font-medium">
                  Are you sure you want to withdraw <strong>{amount} TON</strong>?
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={confirmWithdraw}
                    disabled={isWithdrawing}
                    className="px-6 py-2 rounded-md bg-blue-600 text-white font-semibold"
                  >
                    {isWithdrawing ? 'Withdrawing...' : 'Yes, Withdraw'}
                  </button>
                  <button
                    onClick={() => setConfirming(false)}
                    className="px-6 py-2 rounded-md border font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="relative mb-4">
                  <input
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full px-4 py-3 pr-14 border border-gray-300 rounded-md text-black"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                    <img
                      src={tonSymbol}
                      alt="TON"
                      width={18}
                      height={18}
                      className="rounded-full"
                    />
                    <span className="text-sm text-black font-semibold">TON</span>
                  </div>
                </div>
                <button
                  onClick={handleWithdraw}
                  className="w-full py-3 rounded-md bg-blue-600 text-white font-semibold"
                >
                  Withdraw
                </button>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
