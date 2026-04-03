/**
 * Test result reporting — JSON and HTML output.
 */

import { TestResult } from './runner';
import * as fs from 'fs';
import * as path from 'path';

export interface ReportOptions {
  outputDir?: string;
  format?: 'json' | 'html' | 'both';
}

export function generateReport(result: TestResult, options: ReportOptions = {}): {
  json: string;
  html?: string;
} {
  const jsonReport = JSON.stringify({
    passed: result.passed,
    duration: result.duration,
    identity: result.identity,
    error: result.error,
    steps: result.steps.map(s => ({
      name: s.name,
      status: s.status,
      duration: s.duration,
      error: s.error,
    })),
    timestamp: new Date().toISOString(),
  }, null, 2);

  const format = options.format || 'json';

  if (format === 'json') {
    if (options.outputDir) {
      fs.mkdirSync(options.outputDir, { recursive: true });
      fs.writeFileSync(path.join(options.outputDir, 'report.json'), jsonReport);
    }
    return { json: jsonReport };
  }

  // HTML report with embedded screenshots
  const screenshotHtml = result.screenshots
    .map((buf, i) => `<img src="data:image/png;base64,${buf.toString('base64')}" alt="Step ${i + 1}" style="max-width:100%;border:1px solid #333;margin:8px 0;">`)
    .join('\n');

  const stepsHtml = result.steps
    .map(s => {
      const icon = s.status === 'passed' ? '✅' : s.status === 'failed' ? '❌' : '⏭️';
      return `<tr>
        <td>${icon} ${s.name}</td>
        <td>${s.status}</td>
        <td>${s.duration}ms</td>
        <td>${s.error || ''}</td>
      </tr>`;
    })
    .join('\n');

  const html = `<!DOCTYPE html>
<html>
<head>
  <title>AliasKit Test Report</title>
  <style>
    body { font-family: system-ui; background: #0a0a0a; color: #e0e0e0; padding: 24px; max-width: 900px; margin: 0 auto; }
    h1 { color: ${result.passed ? '#4ade80' : '#f87171'}; }
    table { width: 100%; border-collapse: collapse; margin: 16px 0; }
    th, td { text-align: left; padding: 8px 12px; border-bottom: 1px solid #333; }
    th { color: #999; }
    .meta { color: #888; font-size: 14px; }
    .screenshots { margin-top: 24px; }
  </style>
</head>
<body>
  <h1>${result.passed ? 'PASSED' : 'FAILED'}</h1>
  <p class="meta">Duration: ${result.duration}ms | Identity: ${result.identity?.email || 'N/A'} | ${new Date().toISOString()}</p>
  ${result.error ? `<p style="color:#f87171;">Error: ${result.error}</p>` : ''}
  <table>
    <tr><th>Step</th><th>Status</th><th>Duration</th><th>Error</th></tr>
    ${stepsHtml}
  </table>
  <div class="screenshots">
    <h2>Screenshots</h2>
    ${screenshotHtml}
  </div>
</body>
</html>`;

  if (options.outputDir) {
    fs.mkdirSync(options.outputDir, { recursive: true });
    fs.writeFileSync(path.join(options.outputDir, 'report.json'), jsonReport);
    fs.writeFileSync(path.join(options.outputDir, 'report.html'), html);

    // Also save individual screenshots
    result.screenshots.forEach((buf, i) => {
      fs.writeFileSync(path.join(options.outputDir!, `step-${i + 1}.png`), buf);
    });
  }

  return { json: jsonReport, html };
}
