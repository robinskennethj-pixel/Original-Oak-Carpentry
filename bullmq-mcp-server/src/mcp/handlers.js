export class MCPHandlers {
  constructor(jobQueue) {
    this.jobQueue = jobQueue;
  }

  async handleToolCall(request) {
    const { name, arguments: args } = request.params;

    try {
      switch (name) {
        case 'add_job':
          return await this.handleAddJob(args);
        case 'get_queue_metrics':
          return await this.handleGetQueueMetrics(args);
        case 'get_job_status':
          return await this.handleGetJobStatus(args);
        case 'pause_queue':
          return await this.handlePauseQueue(args);
        case 'resume_queue':
          return await this.handleResumeQueue(args);
        default:
          throw new Error(`Unknown tool: ${name}`);
      }
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error: ${error.message}`
          }
        ]
      };
    }
  }

  async handleAddJob(args) {
    const { name, data, delay = 0 } = args;
    const job = await this.jobQueue.addJob(name, data, delay);

    return {
      content: [
        {
          type: 'text',
          text: `Job added successfully!\nID: ${job.id}\nName: ${name}\nDelay: ${delay}ms\nData: ${JSON.stringify(data, null, 2)}`
        }
      ]
    };
  }

  async handleGetQueueMetrics(args) {
    const { queue = 'default' } = args;
    const metrics = await this.jobQueue.getQueueMetrics();

    return {
      content: [
        {
          type: 'text',
          text: `Queue Metrics for "${queue}":\n` +
                `Waiting: ${metrics.waiting}\n` +
                `Active: ${metrics.active}\n` +
                `Completed: ${metrics.completed}\n` +
                `Failed: ${metrics.failed}\n` +
                `Delayed: ${metrics.delayed}\n` +
                `Total: ${metrics.total}`
        }
      ]
    };
  }

  async handleGetJobStatus(args) {
    const { jobId } = args;
    const job = await this.jobQueue.getJob(jobId);

    if (!job) {
      throw new Error(`Job with ID ${jobId} not found`);
    }

    const state = await job.getState();

    return {
      content: [
        {
          type: 'text',
          text: `Job Status:\n` +
                `ID: ${job.id}\n` +
                `Name: ${job.name}\n` +
                `Status: ${state}\n` +
                `Progress: ${job.progress || 0}%\n` +
                `Data: ${JSON.stringify(job.data, null, 2)}`
        }
      ]
    };
  }

  async handlePauseQueue(args) {
    const { queue = 'default' } = args;
    await this.jobQueue.pause();

    return {
      content: [
        {
          type: 'text',
          text: `Queue "${queue}" has been paused`
        }
      ]
    };
  }

  async handleResumeQueue(args) {
    const { queue = 'default' } = args;
    await this.jobQueue.resume();

    return {
      content: [
        {
          type: 'text',
          text: `Queue "${queue}" has been resumed`
        }
      ]
    };
  }

  async getQueueMetrics() {
    return await this.jobQueue.getQueueMetrics();
  }
}