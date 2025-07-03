// hooks
import useMediaQuery from '@/hooks/screens/useMediaQuery';

export default function useDesktopAndUp(): boolean {
  return useMediaQuery('(min-width: 1024px)');
}
