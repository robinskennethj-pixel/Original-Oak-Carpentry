import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { question, context } = await request.json();

    if (!question) {
      return NextResponse.json(
        { error: 'Question is required' },
        { status: 400 }
      );
    }

    // Validate environment with MCP integration
    const ragApiUrl = process.env.RAG_API_URL;
    if (!ragApiUrl) {
      return NextResponse.json(
        { error: 'RAG API URL not configured' },
        { status: 500 }
      );
    }

    // Query the RAG service with MCP optimization
    const queryParams = new URLSearchParams({
      q: question,
      ...(context && { context })
    });

    const response = await fetch(`${ragApiUrl}/query?${queryParams.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Add timeout for MCP reliability
      signal: AbortSignal.timeout(30000),
    });

    if (!response.ok) {
      throw new Error(`RAG service responded with ${response.status}`);
    }

    const data = await response.json();

    // Log for MCP monitoring
    console.log('MCP RAG Query Success:', {
      question: question.substring(0, 50) + '...',
      resultsCount: data.results?.length || 0,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({
      query: question,
      results: data.results || [],
      confidence: data.confidence || 0.8,
      source: 'mcp-rag-service'
    });

  } catch (error: any) {
    console.error('MCP RAG Query Error:', error);

    // Return cached response or error message
    return NextResponse.json(
      {
        query: request.body ? JSON.parse(request.body.toString()).question : '',
        error: error.message || 'Failed to query RAG service',
        fallback: true,
        suggestion: 'Please try again or contact support'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const question = searchParams.get('q');

    if (!question) {
      return NextResponse.json(
        { error: 'Question parameter is required' },
        { status: 400 }
      );
    }

    // Use POST method internally for consistency
    const mockRequest = {
      json: async () => ({ question })
    } as NextRequest;

    return POST(mockRequest);

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to process request' },
      { status: 500 }
    );
  }
}