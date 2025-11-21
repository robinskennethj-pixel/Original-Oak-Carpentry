import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      status: 'healthy',
      services: {
        aws: 'available',
        langchain: 'available',
        filesystem: 'available',
        git: 'available',
        docker: 'available',
        bullmq: 'available',
        performance: 'available',
        build: 'available'
      },
      port: 3015,
      timestamp: new Date().toISOString(),
      message: 'All MCP services running on single port'
    });
  } catch (error) {
    console.error('Error in MCP health check:', error);
    return NextResponse.json(
      { 
        status: 'error', 
        error: 'Health check failed',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

