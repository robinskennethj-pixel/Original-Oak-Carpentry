import { Queue, Worker } from 'bullmq';
import IORedis from 'ioredis';
import { sampleProcessor } from './processors/sampleProcessor.js';

export class JobQueue {
  constructor() {
    this.connection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379', {
      maxRetriesPerRequest: null,
      lazyConnect: true
    });

    this.queue = null;
    this.worker = null;
  }

  async initialize() {
    this.queue = new Queue('default', {
      connection: this.connection,
      defaultJobOptions: {
        removeOnComplete: 100,
        removeOnFail: 1000,
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 1000
        }
      }
    });

    this.worker = new Worker('default', sampleProcessor, {
      connection: this.connection,
      concurrency: 5
    });

    this.worker.on('completed', (job) => {
      console.log(`Job ${job.id} completed successfully`);
    });

    this.worker.on('failed', (job, err) => {
      console.error(`Job ${job.id} failed:`, err.message);
    });

    this.worker.on('progress', (job, progress) => {
      console.log(`Job ${job.id} progress: ${progress}%`);
    });

    console.log('BullMQ queue and worker initialized');
  }

  async addJob(name, data, delay = 0) {
    if (!this.queue) {
      throw new Error('Queue not initialized');
    }

    const job = await this.queue.add(name, data, {
      delay,
      jobId: `${name}-${Date.now()}`
    });

    return job;
  }

  async getJob(jobId) {
    if (!this.queue) {
      throw new Error('Queue not initialized');
    }

    return await this.queue.getJob(jobId);
  }

  async getQueueMetrics() {
    if (!this.queue) {
      throw new Error('Queue not initialized');
    }

    const [
      waiting,
      active,
      completed,
      failed,
      delayed
    ] = await Promise.all([
      this.queue.getWaiting(),
      this.queue.getActive(),
      this.queue.getCompleted(),
      this.queue.getFailed(),
      this.queue.getDelayed()
    ]);

    return {
      waiting: waiting.length,
      active: active.length,
      completed: completed.length,
      failed: failed.length,
      delayed: delayed.length,
      total: waiting.length + active.length + completed.length + failed.length + delayed.length
    };
  }

  async pause() {
    if (!this.queue) {
      throw new Error('Queue not initialized');
    }
    await this.queue.pause();
  }

  async resume() {
    if (!this.queue) {
      throw new Error('Queue not initialized');
    }
    await this.queue.resume();
  }

  async close() {
    if (this.worker) {
      await this.worker.close();
    }
    if (this.queue) {
      await this.queue.close();
    }
    await this.connection.quit();
  }
}