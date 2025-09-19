import axios from 'axios';


const RESOURCE_ID = '9ef84268-d588-465a-a308-a864a43d0070';

export interface MarketRecord {
  commodity: string;
  district: string;
  market: string;
  modal_price: string;
  arrival_date: string;
}

interface ApiResponse {
  records: MarketRecord[];
}

/**
 * Returns the top N commodities (highest modal price) for a given state, district, and market.
 */
export async function fetchTopCommoditiesByPrice(
  state?: string,
  district?: string,
  market?: string,
  limit: number = 500
): Promise<{ commodity: string; highestPrice: number; record: MarketRecord }[]> {
  const params: Record<string, string> = {
    'api-key': API_KEY,
    format: 'json',
    limit: String(limit),
  };

  if (state) params['filters[state]'] = state;
  if (district) params['filters[district]'] = district;
  if (market) params['filters[market]'] = market;

  const res = await axios.get<ApiResponse>(
    `https://api.data.gov.in/resource/${RESOURCE_ID}`,
    { params }
  );

  const records = res.data.records;
  if (!records || records.length === 0) throw new Error('No data found');

  // Map to track highest modal price per commodity
  const map = new Map<string, { highestPrice: number; record: MarketRecord }>();

  for (const rec of records) {
    const price = Number(rec.modal_price);
    const current = map.get(rec.commodity);
    if (!current || price > current.highestPrice) {
      map.set(rec.commodity, { highestPrice: price, record: rec });
    }
  }

  // Convert map to sorted array of top commodities
  return Array.from(map.entries())
    .map(([commodity, data]) => ({
      commodity,
      highestPrice: data.highestPrice,
      record: data.record,
    }))
    .sort((a, b) => b.highestPrice - a.highestPrice)
    .slice(0, 10); // top 10 by default
}
