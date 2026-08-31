import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { query = '', filters = {} } = body;

    // Load referrals data
    const dataPath = path.join(process.cwd(), 'src/lib/data/referrals.json');
    let referrals = [];
    try {
      const fileContents = fs.readFileSync(dataPath, 'utf8');
      referrals = JSON.parse(fileContents);
    } catch (e) {
      console.error('Failed to read referrals.json:', e);
      return NextResponse.json({ error: 'Referrals data unavailable' }, { status: 500 });
    }

    const queryLower = query.toLowerCase();

    // Filter referrals
    let filtered = referrals.filter((referral: any) => {
      // Check explicit filters
      if (filters.service_type && referral.primary_service_types && !referral.primary_service_types.toLowerCase().includes(filters.service_type.toLowerCase())) {
        return false;
      }
      if (filters.county && referral.counties_served && !referral.counties_served.toLowerCase().includes(filters.county.toLowerCase())) {
        return false;
      }
      if (filters.cost && referral.cost && referral.cost.toLowerCase() !== filters.cost.toLowerCase()) {
        return false;
      }

      // Check text search
      if (queryLower) {
        const searchableText = [
          referral.organization_name,
          referral.primary_service_types,
          referral.notes,
          referral.counties_served,
          referral.city
        ].filter(Boolean).join(' ').toLowerCase();

        if (!searchableText.includes(queryLower)) {
          return false;
        }
      }

      return true;
    });

    // Return top 10 matches
    const topMatches = filtered.slice(0, 10);

    return NextResponse.json({ results: topMatches });
  } catch (error) {
    console.error('Referral Search Error:', error);
    return NextResponse.json({ error: 'Failed to search referrals' }, { status: 500 });
  }
}
