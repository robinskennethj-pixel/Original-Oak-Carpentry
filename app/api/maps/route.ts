import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    const service = searchParams.get('service') || 'geocode';

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Google Maps API key not configured' },
        { status: 500 }
      );
    }

    let apiUrl = '';
    let params = new URLSearchParams();

    switch (service) {
      case 'geocode':
        if (address) {
          apiUrl = 'https://maps.googleapis.com/maps/api/geocode/json';
          params.set('address', address);
        } else if (lat && lng) {
          apiUrl = 'https://maps.googleapis.com/maps/api/geocode/json';
          params.set('latlng', `${lat},${lng}`);
        }
        break;

      case 'places':
        apiUrl = 'https://maps.googleapis.com/maps/api/place/textsearch/json';
        if (address) {
          params.set('query', `carpentry services in ${address}`);
        }
        break;

      case 'nearby':
        apiUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
        if (lat && lng) {
          params.set('location', `${lat},${lng}`);
          params.set('radius', '5000');
          params.set('keyword', 'carpentry');
        }
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid service parameter' },
          { status: 400 }
        );
    }

    params.set('key', apiKey);

    const response = await fetch(`${apiUrl}?${params.toString()}`);
    const data = await response.json();

    if (data.status === 'OK') {
      return NextResponse.json({
        status: 'success',
        data: data.results,
        service,
        timestamp: new Date().toISOString()
      });
    } else {
      return NextResponse.json(
        {
          error: 'Google Maps API error',
          details: data.status,
          message: data.error_message || 'Unknown error'
        },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('Maps API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { service, data } = body;

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Google Maps API key not configured' },
        { status: 500 }
      );
    }

    let apiUrl = '';
    let params = new URLSearchParams();

    switch (service) {
      case 'directions':
        apiUrl = 'https://maps.googleapis.com/maps/api/directions/json';
        if (data.origin && data.destination) {
          params.set('origin', data.origin);
          params.set('destination', data.destination);
          params.set('mode', data.mode || 'driving');
        }
        break;

      case 'distance':
        apiUrl = 'https://maps.googleapis.com/maps/api/distancematrix/json';
        if (data.origins && data.destinations) {
          params.set('origins', data.origins.join('|'));
          params.set('destinations', data.destinations.join('|'));
          params.set('mode', data.mode || 'driving');
        }
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid service parameter' },
          { status: 400 }
        );
    }

    params.set('key', apiKey);

    const response = await fetch(`${apiUrl}?${params.toString()}`);
    const result = await response.json();

    if (result.status === 'OK') {
      return NextResponse.json({
        status: 'success',
        data: result,
        service,
        timestamp: new Date().toISOString()
      });
    } else {
      return NextResponse.json(
        {
          error: 'Google Maps API error',
          details: result.status,
          message: result.error_message || 'Unknown error'
        },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('Maps API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}