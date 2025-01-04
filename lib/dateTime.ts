/**
 * Formats a date object or string into a localized date and time string.
 * 
 * @param date - The date to format (Date object or date string)
 * @param options - Optional Intl.DateTimeFormatOptions to customize the output
 * @returns A formatted date and time string
 */
export function formatDateTime(date: Date | string, options: Intl.DateTimeFormatOptions = {}): string {
    const dateObject = typeof date === 'string' ? new Date(date) : date;
  
    if (isNaN(dateObject.getTime())) {
      console.error('Invalid date provided to formatDateTime');
      return 'Invalid Date';
    }
  
    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
  
    const mergedOptions = { ...defaultOptions, ...options };
  
    return new Intl.DateTimeFormat('en-US', mergedOptions).format(dateObject);
  }
  
  /**
   * Formats a date object or string into a relative time string (e.g., "2 days ago").
   * 
   * @param date - The date to format (Date object or date string)
   * @returns A relative time string
   */
  export function formatRelativeTime(date: Date | string): string {
    const dateObject = typeof date === 'string' ? new Date(date) : date;
  
    if (isNaN(dateObject.getTime())) {
      console.error('Invalid date provided to formatRelativeTime');
      return 'Invalid Date';
    }
  
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - dateObject.getTime()) / 1000);
  
    const intervals = [
      { label: 'year', seconds: 31536000 },
      { label: 'month', seconds: 2592000 },
      { label: 'day', seconds: 86400 },
      { label: 'hour', seconds: 3600 },
      { label: 'minute', seconds: 60 },
      { label: 'second', seconds: 1 }
    ];
  
    for (const interval of intervals) {
      const count = Math.floor(diffInSeconds / interval.seconds);
      if (count >= 1) {
        return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
      }
    }
  
    return 'just now';
  }
  
  