import { spawn } from 'child_process'

// --- Configuration ---
// High-quality H.264 settings (CRF 18 is visually near-lossless)
const VIDEO_CRF = '18'
const VIDEO_PRESET = 'medium'
const AUDIO_BITRATE = '192k'
// ---------------------

/**
 * Converts a WebM video file to MP4 using FFmpeg with high-quality settings.
 * @param inputPath Path to the input WebM file.
 * @param outputPath Path to the output mp4 file
 */
export async function convertVideo(inputPath: string, outputPath?: string): Promise<string> {
  const timestamp = getTimestampedFilename()

  outputPath = `videos/demo-${timestamp}.mp4`
  // FFmpeg command arguments
  const args = [
    '-i',
    inputPath, // Input file
    '-c:v',
    'libx264', // Video codec: H.264
    '-crf',
    VIDEO_CRF, // Constant Rate Factor (Quality)
    '-preset',
    VIDEO_PRESET, // Encoding speed vs. compression
    '-c:a',
    'aac', // Audio codec: AAC
    '-b:a',
    AUDIO_BITRATE, // Audio bitrate
    '-y', // Overwrite output file without asking
    outputPath, // Output file
  ]

  return new Promise((resolve, reject) => {
    console.log(`\nStarting FFmpeg conversion:`)
    console.log(`  Input: ${inputPath}`)
    console.log(`  Output: ${outputPath}`)
    console.log(`  Command: ffmpeg ${args.join(' ')}\n`)

    // Use Bun's implementation of Node's spawn to execute ffmpeg
    const ffmpeg = spawn('ffmpeg', args)

    ffmpeg.stdout.on('data', (data) => {
      // FFmpeg often outputs progress to stderr, but we capture stdout just in case
      // console.log(`FFmpeg stdout: ${data}`);
    })

    ffmpeg.stderr.on('data', (data) => {
      // FFmpeg typically writes progress and warnings to stderr
      // Only log if you want detailed, continuous output during conversion
      process.stdout.write(data.toString())
    })

    ffmpeg.on('close', (code) => {
      if (code === 0) {
        console.log(`\n✅ Conversion successful! File saved to: ${outputPath}`)
        resolve(outputPath)
      } else {
        const errorMsg = `\n❌ FFmpeg process exited with code ${code}. Check FFmpeg installation and paths.`
        console.error(errorMsg)
        reject(new Error(errorMsg))
      }
    })

    ffmpeg.on('error', (err) => {
      console.error(`\n❌ Failed to start FFmpeg: ${err.message}`)
      console.error('Is FFmpeg installed and available in your system PATH?')
      reject(err)
    })
  })
}

function getTimestampedFilename(): string {
  const now = new Date()

  // Helper function to ensure single digits are padded with a leading zero
  const pad = (num: number): string => num.toString().padStart(2, '0')

  const year = now.getFullYear()
  const month = pad(now.getMonth() + 1) // Month is 0-indexed
  const day = pad(now.getDate())
  const hours = pad(now.getHours())
  const minutes = pad(now.getMinutes())
  const seconds = pad(now.getSeconds())

  return `${year}-${month}-${day}-${hours}-${minutes}-${seconds}`
}
