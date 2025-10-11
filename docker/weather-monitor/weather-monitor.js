const cron = require('node-cron');
const axios = require('axios');

// Configuration
const config = {
  noaaApiBase: 'https://api.weather.gov',
  openaiApiKey: process.env.OPENAI_API_KEY,
  serverUrl: process.env.SERVER_URL || 'http://localhost:3004',
  checkInterval: '*/15 * * * *', // Every 15 minutes
  floridaZones: ['FLS079', 'FLS080', 'FLS081', 'FLS082'], // Miami-Dade, Broward, Palm Beach, Monroe
  logLevel: 'info'
};

class WeatherMonitor {
  constructor() {
    this.isRunning = false;
    this.lastCheck = null;
    this.processedAlerts = new Set();
  }

  async start() {
    console.log('🌤️  Original Oak Weather Monitor starting...');
    console.log(`📍 Monitoring zones: ${config.floridaZones.join(', ')}`);

    // Initial check
    await this.checkWeatherAlerts();

    // Schedule regular checks
    cron.schedule(config.checkInterval, async () => {
      console.log(`⏰ Weather check at ${new Date().toLocaleString()}`);
      await this.checkWeatherAlerts();
    });

    // Health check endpoint
    this.startHealthCheck();

    this.isRunning = true;
    console.log('✅ Weather Monitor started successfully');
  }

  async checkWeatherAlerts() {
    try {
      for (const zone of config.floridaZones) {
        await this.checkZoneAlerts(zone);
      }
      this.lastCheck = new Date();
    } catch (error) {
      console.error('❌ Weather check error:', error.message);
    }
  }

  async checkZoneAlerts(zone) {
    try {
      const response = await axios.get(`${config.noaaApiBase}/alerts/active?zone=${zone}`);
      const alerts = response.data.features;

      if (alerts && alerts.length > 0) {
        for (const alert of alerts) {
          await this.processAlert(alert, zone);
        }
      }
    } catch (error) {
      console.error(`❌ Error checking zone ${zone}:`, error.message);
    }
  }

  async processAlert(alert, zone) {
    const alertId = alert.properties.id;

    // Skip if already processed
    if (this.processedAlerts.has(alertId)) {
      return;
    }

    const alertData = {
      id: alertId,
      event: alert.properties.event,
      severity: alert.properties.severity,
      certainty: alert.properties.certainty,
      urgency: alert.properties.urgency,
      headline: alert.properties.headline,
      description: alert.properties.description,
      instruction: alert.properties.instruction,
      area: alert.properties.areaDesc,
      effective: alert.properties.effective,
      expires: alert.properties.expires
    };

    console.log(`🚨 New weather alert: ${alertData.headline}`);

    // Generate AI summary
    const aiSummary = await this.generateAISummary(alertData);

    if (aiSummary) {
      // Send to main application
      await this.sendAlertToApp(alertData, aiSummary);

      // Send notifications to clients
      await this.sendClientNotifications(alertData, aiSummary);
    }

    // Mark as processed
    this.processedAlerts.add(alertId);

    // Clean up old processed alerts (keep last 100)
    if (this.processedAlerts.size > 100) {
      const firstAlert = this.processedAlerts.values().next().value;
      this.processedAlerts.delete(firstAlert);
    }
  }

  async generateAISummary(alert) {
    if (!config.openaiApiKey) {
      console.log('⚠️  OpenAI API key not configured, skipping AI summary');
      return null;
    }

    const prompt = `
You are a weather alert specialist for Original Oak Carpentry in Florida.

Weather Alert:
- Event: ${alert.event}
- Severity: ${alert.severity}
- Headline: ${alert.headline}
- Description: ${alert.description}
- Area: ${alert.area}

Create a concise summary for carpentry business owners that:
1. Explains the weather situation in simple terms
2. Identifies specific risks to outdoor carpentry projects
3. Recommends immediate actions to protect work sites and equipment
4. Suggests potential business opportunities (storm damage repairs, etc.)
5. Uses a friendly, professional tone

Format as JSON with: summary, carpentryImpact, recommendedAction, location, urgency (low/medium/high)
`;

    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [{
          role: 'user',
          content: prompt
        }],
        max_tokens: 300,
        temperature: 0.7
      }, {
        headers: {
          'Authorization': `Bearer ${config.openaiApiKey}`,
          'Content-Type': 'application/json'
        }
      });

      const content = response.data.choices[0].message.content;
      return JSON.parse(content);
    } catch (error) {
      console.error('❌ AI summary error:', error.message);
      return null;
    }
  }

  async sendAlertToApp(alert, aiSummary) {
    try {
      await axios.post(`${config.serverUrl}/api/ai/weather-alerts`, {
        alert,
        aiSummary,
        timestamp: new Date().toISOString()
      });
      console.log('✅ Alert sent to main application');
    } catch (error) {
      console.error('❌ Error sending alert to app:', error.message);
    }
  }

  async sendClientNotifications(alert, aiSummary) {
    // This would integrate with your email/SMS system
    // For now, log the notification that would be sent
    console.log('📧 Would send notification to clients:');
    console.log(`Subject: Weather Alert - ${aiSummary.summary}`);
    console.log(`Body: ${aiSummary.carpentryImpact} - ${aiSummary.recommendedAction}`);
    console.log(`Location: ${aiSummary.location}`);
    console.log(`Urgency: ${aiSummary.urgency}`);
  }

  startHealthCheck() {
    const express = require('express');
    const app = express();

    app.get('/health', (req, res) => {
      res.json({
        status: 'healthy',
        isRunning: this.isRunning,
        lastCheck: this.lastCheck,
        processedAlerts: this.processedAlerts.size,
        timestamp: new Date().toISOString()
      });
    });

    app.listen(3001, () => {
      console.log('🏥 Health check server running on port 3001');
    });
  }
}

// Start the weather monitor
const monitor = new WeatherMonitor();
monitor.start().catch(console.error);