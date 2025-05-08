import { Icon, type IconProps } from '@chakra-ui/react';
import { KbAlgorand, KbVoi } from '@kibisis/icons';
import React, { type ReactElement } from 'react';
import {
  IoAirplaneOutline,
  IoAmericanFootballOutline,
  IoBagHandleOutline,
  IoBalloonOutline,
  IoBaseballOutline,
  IoBasketballOutline,
  IoBeerOutline,
  IoBicycleOutline,
  IoBoatOutline,
  IoBriefcaseOutline,
  IoBrushOutline,
  IoBugOutline,
  IoBuildOutline,
  IoBulbOutline,
  IoBusOutline,
  IoBusinessOutline,
  IoCafeOutline,
  IoCarOutline,
  IoCardOutline,
  IoCartOutline,
  IoCashOutline,
  IoCloudOutline,
  IoCodeSlashOutline,
  IoColorPaletteOutline,
  IoCompassOutline,
  IoConstructOutline,
  IoCubeOutline,
  IoDiamondOutline,
  IoDiceOutline,
  IoEarthOutline,
  IoEggOutline,
  IoEllipseOutline,
  IoExtensionPuzzleOutline,
  IoFemaleOutline,
  IoFileTrayOutline,
  IoFilmOutline,
  IoFingerPrintOutline,
  IoFishOutline,
  IoFitnessOutline,
  IoFlagOutline,
  IoFlameOutline,
  IoFlashOutline,
  IoFlashlightOutline,
  IoFlaskOutline,
  IoFlowerOutline,
  IoFootballOutline,
  IoFootstepsOutline,
  IoGameControllerOutline,
  IoGlasses,
  IoGlobeOutline,
  IoGolfOutline,
  IoHammerOutline,
  IoHeartOutline,
  IoHelpBuoyOutline,
  IoHomeOutline,
  IoKeyOutline,
  IoLeafOutline,
  IoLibraryOutline,
  IoMaleOutline,
  IoMoonOutline,
  IoMusicalNotes,
  IoPawOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoPizzaOutline,
  IoPlanetOutline,
  IoPrismOutline,
  IoRainyOutline,
  IoReceiptOutline,
  IoRestaurantOutline,
  IoRocketOutline,
  IoRoseOutline,
  IoSchoolOutline,
  IoServerOutline,
  IoShieldOutline,
  IoShirtOutline,
  IoSkullOutline,
  IoSnowOutline,
  IoSparklesOutline,
  IoStarOutline,
  IoStorefrontOutline,
  IoSunnyOutline,
  IoTelescopeOutline,
  IoTennisballOutline,
  IoTerminalOutline,
  IoThermometerOutline,
  IoThumbsUpOutline,
  IoTicketOutline,
  IoTimeOutline,
  IoTrainOutline,
  IoTransgenderOutline,
  IoTrashOutline,
  IoTrophyOutline,
  IoUmbrellaOutline,
  IoWalletOutline,
  IoWaterOutline,
  IoWine,
} from 'react-icons/io5';
import {
  FaBitcoin,
  FaDollarSign,
  FaEthereum,
  FaEuroSign,
  FaYenSign,
} from 'react-icons/fa';

// types
import type { IAccountIconParams } from '@/types';

// utils
import { iconSize } from '@/utilities/icons/index';

/**
 * Parses the account icon to an JSX Icon. If the account icon is null, it defaults to the wallet icon.
 * @param {IAccountIconParams} params - The account icon, the color and size.
 * @returns {ReactElement} The react-icons IconType for the account icon.
 */
export default function accountIcon({
  color,
  icon,
  size,
}: IAccountIconParams): ReactElement {
  const defaultProps: Partial<IconProps> = {
    boxSize: iconSize(size),
    color,
  };
  let _icon = IoWalletOutline;

  // if (icon === 'algorand') {
  //   return <AlgorandIcon {...defaultProps} />;
  // }
  //
  // if (icon === 'voi') {
  //   return <VoiIcon {...defaultProps} />;
  // }

  switch (icon) {
    case 'airplane':
      _icon = IoAirplaneOutline;
      break;
    case 'algorand':
      _icon = KbAlgorand;
      break;
    case 'american-football':
      _icon = IoAmericanFootballOutline;
      break;
    case 'balloon':
      _icon = IoBalloonOutline;
      break;
    case 'baseball':
      _icon = IoBaseballOutline;
      break;
    case 'basketball':
      _icon = IoBasketballOutline;
      break;
    case 'beer':
      _icon = IoBeerOutline;
      break;
    case 'bicycle':
      _icon = IoBicycleOutline;
      break;
    case 'bitcoin':
      _icon = FaBitcoin;
      break;
    case 'boat':
      _icon = IoBoatOutline;
      break;
    case 'briefcase':
      _icon = IoBriefcaseOutline;
      break;
    case 'brush':
      _icon = IoBrushOutline;
      break;
    case 'bug':
      _icon = IoBugOutline;
      break;
    case 'bulb':
      _icon = IoBulbOutline;
      break;
    case 'buoy':
      _icon = IoHelpBuoyOutline;
      break;
    case 'bus':
      _icon = IoBusOutline;
      break;
    case 'business':
      _icon = IoBusinessOutline;
      break;
    case 'cafe':
      _icon = IoCafeOutline;
      break;
    case 'car':
      _icon = IoCarOutline;
      break;
    case 'cart':
      _icon = IoCartOutline;
      break;
    case 'cash':
      _icon = IoCashOutline;
      break;
    case 'circle':
      _icon = IoEllipseOutline;
      break;
    case 'cloud':
      _icon = IoCloudOutline;
      break;
    case 'code':
      _icon = IoCodeSlashOutline;
      break;
    case 'compass':
      _icon = IoCompassOutline;
      break;
    case 'construct':
      _icon = IoConstructOutline;
      break;
    case 'credit-card':
      _icon = IoCardOutline;
      break;
    case 'cube':
      _icon = IoCubeOutline;
      break;
    case 'database':
      _icon = IoServerOutline;
      break;
    case 'diamond':
      _icon = IoDiamondOutline;
      break;
    case 'dice':
      _icon = IoDiceOutline;
      break;
    case 'earth':
      _icon = IoEarthOutline;
      break;
    case 'egg':
      _icon = IoEggOutline;
      break;
    case 'ethereum':
      _icon = FaEthereum;
      break;
    case 'euro':
      _icon = FaEuroSign;
      break;
    case 'female':
      _icon = IoFemaleOutline;
      break;
    case 'file-tray':
      _icon = IoFileTrayOutline;
      break;
    case 'film':
      _icon = IoFilmOutline;
      break;
    case 'fingerprint':
      _icon = IoFingerPrintOutline;
      break;
    case 'fire':
      _icon = IoFlameOutline;
      break;
    case 'fish':
      _icon = IoFishOutline;
      break;
    case 'fitness':
      _icon = IoFitnessOutline;
      break;
    case 'flag':
      _icon = IoFlagOutline;
      break;
    case 'flash':
      _icon = IoFlashOutline;
      break;
    case 'flashlight':
      _icon = IoFlashlightOutline;
      break;
    case 'flask':
      _icon = IoFlaskOutline;
      break;
    case 'flower':
      _icon = IoFlowerOutline;
      break;
    case 'football':
      _icon = IoFootballOutline;
      break;
    case 'footsteps':
      _icon = IoFootstepsOutline;
      break;
    case 'gaming':
      _icon = IoGameControllerOutline;
      break;
    case 'glasses':
      _icon = IoGlasses;
      break;
    case 'globe':
      _icon = IoGlobeOutline;
      break;
    case 'golf':
      _icon = IoGolfOutline;
      break;
    case 'hammer':
      _icon = IoHammerOutline;
      break;
    case 'heart':
      _icon = IoHeartOutline;
      break;
    case 'home':
      _icon = IoHomeOutline;
      break;
    case 'key':
      _icon = IoKeyOutline;
      break;
    case 'leaf':
      _icon = IoLeafOutline;
      break;
    case 'library':
      _icon = IoLibraryOutline;
      break;
    case 'male':
      _icon = IoMaleOutline;
      break;
    case 'moon':
      _icon = IoMoonOutline;
      break;
    case 'music-note':
      _icon = IoMusicalNotes;
      break;
    case 'palette':
      _icon = IoColorPaletteOutline;
      break;
    case 'paw':
      _icon = IoPawOutline;
      break;
    case 'people':
      _icon = IoPeopleOutline;
      break;
    case 'person':
      _icon = IoPersonOutline;
      break;
    case 'pizza':
      _icon = IoPizzaOutline;
      break;
    case 'planet':
      _icon = IoPlanetOutline;
      break;
    case 'prism':
      _icon = IoPrismOutline;
      break;
    case 'puzzle':
      _icon = IoExtensionPuzzleOutline;
      break;
    case 'rainy':
      _icon = IoRainyOutline;
      break;
    case 'receipt':
      _icon = IoReceiptOutline;
      break;
    case 'restaurant':
      _icon = IoRestaurantOutline;
      break;
    case 'rocket':
      _icon = IoRocketOutline;
      break;
    case 'rose':
      _icon = IoRoseOutline;
      break;
    case 'school':
      _icon = IoSchoolOutline;
      break;
    case 'shield':
      _icon = IoShieldOutline;
      break;
    case 'shirt':
      _icon = IoShirtOutline;
      break;
    case 'shopping-bag':
      _icon = IoBagHandleOutline;
      break;
    case 'skull':
      _icon = IoSkullOutline;
      break;
    case 'snow':
      _icon = IoSnowOutline;
      break;
    case 'sparkles':
      _icon = IoSparklesOutline;
      break;
    case 'star':
      _icon = IoStarOutline;
      break;
    case 'storefront':
      _icon = IoStorefrontOutline;
      break;
    case 'sun':
      _icon = IoSunnyOutline;
      break;
    case 'telescope':
      _icon = IoTelescopeOutline;
      break;
    case 'tennis':
      _icon = IoTennisballOutline;
      break;
    case 'terminal':
      _icon = IoTerminalOutline;
      break;
    case 'thermometer':
      _icon = IoThermometerOutline;
      break;
    case 'thumbs-up':
      _icon = IoThumbsUpOutline;
      break;
    case 'ticket':
      _icon = IoTicketOutline;
      break;
    case 'time':
      _icon = IoTimeOutline;
      break;
    case 'train':
      _icon = IoTrainOutline;
      break;
    case 'transgender':
      _icon = IoTransgenderOutline;
      break;
    case 'trash':
      _icon = IoTrashOutline;
      break;
    case 'trophy':
      _icon = IoTrophyOutline;
      break;
    case 'umbrella':
      _icon = IoUmbrellaOutline;
      break;
    case 'usd':
      _icon = FaDollarSign;
      break;
    case 'voi':
      _icon = KbVoi;
      break;
    case 'water':
      _icon = IoWaterOutline;
      break;
    case 'wine':
      _icon = IoWine;
      break;
    case 'wrench':
      _icon = IoBuildOutline;
      break;
    case 'yen':
      _icon = FaYenSign;
      break;
    case 'wallet':
    default:
      break;
  }

  return <Icon as={_icon} {...defaultProps} />;
}
