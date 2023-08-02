/**
 * decodeHtmlEntities
 */

 export function decodeHtmlEntities(text: string) {
    if (typeof text !== 'string') {
      throw new Error(`Failed to decode HTML entity: invalid type ${typeof text}`);
    }
  
    let decoded = text;
  
    const entities: Record<string, any> = {
      '&amp;': '\u0026',
      '&quot;': '\u0022',
      '&#039;': '\u0027',
    };
  
    return decoded.replace(/&amp;|&quot;|&#039;/g, (char) => entities[char]);
  }
  
  /**
   * removeLastTrailingSlash
   */
  
  export function removeLastTrailingSlash(url: string) {
    if (typeof url !== 'string') return url;
    return url.replace(/\/$/, '');
  }
  
  export function removeExtraSpaces(text: string) {
    if (typeof text !== 'string') return;
    return text.replace(/\s+/g, ' ').trim();
  }

export const config = { homepage: import.meta.env.PUBLIC_DOMAIN };
  