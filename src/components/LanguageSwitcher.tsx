import { useTranslation } from 'react-i18next';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  return (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <button onClick={() => i18n.changeLanguage('en')}>🇬🇧</button>
      <button onClick={() => i18n.changeLanguage('es')}>🇪🇸</button>
      <button onClick={() => i18n.changeLanguage('ru')}>🇷🇺</button>
    </div>
  );
};
