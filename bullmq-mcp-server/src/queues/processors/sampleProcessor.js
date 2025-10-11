export async function sampleProcessor(job) {
  console.log(`Processing job ${job.id} with data:`, job.data);

  // Simulate some work
  for (let i = 0; i <= 100; i += 20) {
    await job.updateProgress(i);
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Process based on job name
  switch (job.name) {
    case 'email_send':
      return await processEmail(job.data);
    case 'data_process':
      return await processData(job.data);
    case 'report_generate':
      return await generateReport(job.data);
    default:
      return { processed: true, jobId: job.id, data: job.data };
  }
}

async function processEmail(data) {
  // Simulate email processing
  await new Promise(resolve => setTimeout(resolve, 2000));
  return {
    success: true,
    message: `Email processed for ${data.to}`,
    timestamp: new Date().toISOString()
  };
}

async function processData(data) {
  // Simulate data processing
  await new Promise(resolve => setTimeout(resolve, 3000));
  return {
    success: true,
    recordsProcessed: data.records || 0,
    result: 'Data processing completed'
  };
}

async function generateReport(data) {
  // Simulate report generation
  await new Promise(resolve => setTimeout(resolve, 5000));
  return {
    success: true,
    reportId: `report-${Date.now()}`,
    format: data.format || 'pdf',
    pages: Math.floor(Math.random() * 50) + 1
  };
}