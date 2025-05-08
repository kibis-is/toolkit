import { createContext } from 'react';

// types
import type { IKibisisContextState } from '@/types';

const KibisisContext = createContext<IKibisisContextState | null>(null);

export default KibisisContext;
