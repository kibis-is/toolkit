// types
import type { IEllipseTextParams } from '@/types';

/**
 * Ellipse the middle of text.
 * @param {string} text - The text to ellipse.
 * @param {IEllipseTextParams} params - [optional] The start and the end amount to of characters to show.
 * @returns {string} The ellipsed text.
 */
export default function ellipseText(text: string, params?: IEllipseTextParams): string {
  const defaultLength = 5;
  const start = params && params.start ? params.start : defaultLength;
  const end = params && params.end ? params.end : defaultLength;

  return `${text.slice(0, start)}...${text.slice(-end)}`;
}
