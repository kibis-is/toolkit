// hooks
import useMediaQuery from '@/hooks/screens/useMediaQuery';

export default function useTabletAndUp(): boolean {
  return useMediaQuery('(min-width: 768px)');
}
