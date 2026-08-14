
// src/utils/video-converter.ts
import * as fs from 'fs';
import * as path from 'path';
import { execFile } from 'child_process';

export const OUT_ROOT = path.resolve('reports');
export const SHOTS_DIR = path.join(OUT_ROOT, 'screenshots');
export const VIDS_DIR = path.join(OUT_ROOT, 'videos');

/**
 * Ensure output directories exist.
 */
export function ensureOutputDirs(): void {
    fs.mkdirSync(SHOTS_DIR, { recursive: true });
    fs.mkdirSync(VIDS_DIR, { recursive: true });
}

/**
 * Make a safe filename from a scenario name.
 */
export function safeName(name: string): string {
    return name.replace(/[^a-zA-Z0-9._-]+/g, '_').slice(0, 200);
}

/**
 * Check if ffmpeg is available on this machine/CI.
 */
export function ffmpegAvailable(): Promise<boolean> {
    return new Promise((resolve) => {
        execFile('ffmpeg', ['-version'], (err) => resolve(!err));
    });
}

/**
 * Convert WebM → MP4 using ffmpeg (H.264 + AAC for max browser support).
 */
export function convertWebmToMp4(inputPath: string, outputPath: string): Promise<void> {
    return new Promise((resolve, reject) => {
        execFile(
            'ffmpeg',
            [
                '-y',
                '-i', inputPath,
                '-c:v', 'libx264',
                '-preset', 'veryfast',
                '-movflags', '+faststart',
                '-c:a', 'aac',
                outputPath,
            ],
            (error) => (error ? reject(error) : resolve())
        );
    });
}

/**
 * Copy Playwright’s recorded WebM to our videos folder with a nice name.
 */
export function copyWebmToOut(webmSourcePath: string, fileBase: string): string {
    const destWebm = path.join(VIDS_DIR, `${fileBase}.webm`);
    fs.copyFileSync(webmSourcePath, destWebm);
    return destWebm;
}

/**
 * Build an HTML snippet with a link + inline player for the report.
 * `relativeFolder` is the path relative to your final index.html (e.g., 'videos').
 */
export function buildVideoHtml(relativeFolder: string, fileName: string, mime: string): string {
    return `
    <details open>
      <summary style="font-weight:600">Scenario video (${mime.split('/')[1].toUpperCase()})</summary>
      <p>
        ${fileName}Open video</a>
      </p>
      <video controls width="800" style="max-width:100%">
        ${relativeFolder}/${fileName}
        Your browser does not support the video tag.
      </video>
    </details>
  `;
}
