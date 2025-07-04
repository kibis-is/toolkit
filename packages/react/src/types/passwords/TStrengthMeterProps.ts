// types
import type { IBaseComponentProps } from '@/types';

interface IProps {
  score: number;
}

type TStrengthMeterProps = IBaseComponentProps & IProps;

export default TStrengthMeterProps;
