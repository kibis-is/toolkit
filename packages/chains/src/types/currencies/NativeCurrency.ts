/**
 * @property {number} decimals - Specifies the number of decimal places the currency uses.
 * @property {string} iconURI - [optional] A data URI that conforms to RFC-2397 or a URL that points to an image. The
 * **RECOMMENDED** image format should be lossless or vector-based such as a PNG, WebP or SVG.
 * @property {string} name - [optional] A human-readable name for the currency.
 * @property {string} symbol - Defines the symbol associated with the currency. This **SHOULD** be in uppercase.
 */
interface NativeCurrency {
  decimals: number;
  iconURI?: string;
  name?: string;
  symbol: string;
}

export default NativeCurrency;
