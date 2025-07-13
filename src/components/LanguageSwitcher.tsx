import { useTranslation } from 'react-i18next';

export const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        marginTop: '1rem',
        marginBottom: '10px',
      }}
    >
      <label
        htmlFor="language-select"
        className="dolphin-header"
        style={{ marginRight: '0.5rem' }}
      >
        🌐 {t('languageSwitcher.label')}
      </label>
      <select
        id="language-select"
        aria-label={t('languageSwitcher.ariaLabel')}
        value={i18n.language}
        onChange={handleChange}
        style={{
          padding: '0.25rem',
          background: '#fff',
          borderRadius: '8px',
          border: 'none',
          textAlign: 'center',
          fontWeight: 'bold',
          marginRight: '10px',
        }}
      >
        <option value="en">English</option>
        <option value="es">Español</option>
        <option value="ru">Русский</option>
      </select>
    </div>
  );
};
