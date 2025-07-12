import { useTranslation } from 'react-i18next';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <div>
      <label htmlFor="language-select" style={{ marginRight: '0.5rem' }}>
        🌐 Language:
      </label>
      <select
        id="language-select"
        value={i18n.language}
        onChange={handleChange}
        style={{ padding: '0.25rem', borderRadius: '4px' }}
      >
        <option value="en">English</option>
        <option value="es">Español</option>
        <option value="ru">Русский</option>
      </select>
    </div>
  );
};
