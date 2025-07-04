import { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';

export default function useTranslate(): TFunction<'default'> {
  const { t } = useTranslation('default');

  return t;
}
