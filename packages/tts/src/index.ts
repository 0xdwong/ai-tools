import * as dotenv from 'dotenv';
dotenv.config();
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
});

type SpeechCreateOptions = {
  model?: string;
  voice?: string;
  instructions?: string;
  response_format?: 'mp3' | 'opus' | 'aac' | 'flac' | 'wav' | 'pcm';
};

export async function tts(input: string, options: SpeechCreateOptions = {}): Promise<Buffer> {
  const {
    model = 'tts-1-hd',
    voice = 'nova',
    instructions = '',
    response_format = 'mp3',
  } = options || {};

  const audio = await openai.audio.speech.create({
    model,
    voice,
    input,
    instructions,
    response_format,
  });

  const buffer = Buffer.from(await audio.arrayBuffer());
  return buffer;
}
