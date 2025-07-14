import { useTranslation } from 'react-i18next';

export default function StakeHeader() {
  const { t } = useTranslation();

  return (
    <div className="stake-card w-full max-w-4xl mx-auto">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mt-0 mb-2">
        {t('stakeHeader.title')}
      </h1>
      <div className="flex justify-center items-center">
        <p className="text-center text-sm sm:text-base md:text-lg px-4 sm:px-10 md:px-16 lg:px-24 xl:px-32 mb-6 text-white">
          {t('stakeHeader.description')}
        </p>
      </div>
    </div>
  );
}
