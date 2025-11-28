import * as dotenv from 'dotenv';
dotenv.config();
import fs from 'fs';
import path from 'path';
import { tts } from '../src/index';

async function testTts() {
  let speechText = fs.readFileSync('temp/speech.txt').toString();
  const fileName = './temp/audio.mp3';
  const speechFile = path.resolve(fileName);
  const input = speechText;

  const options = {
    model: 'tts-1',
    voice: 'nova',
    // instructions: 'Speak in a cheerful and positive tone.',
    response_format: 'mp3' as const,
  };

  const buffer = await tts(input, options);

  await fs.promises.writeFile(speechFile, buffer);
  console.log(`Audio saved to ${speechFile}`);
}

async function main() {
  await testTts();
}

main();
