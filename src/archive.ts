import archiver from 'archiver';
import path from 'node:path';
import { Format } from './model';

export function archive(format: Format, rootDir: string, filenames: string[]): archiver.Archiver {
  const archive = archiver(format === Format.ZIP ? 'zip' : 'tar', {
    zlib: { level: 9 }, // Sets the compression level.
  });

  process.stdout.write(`Archiving\n`);
  for (const filename of filenames) {
    process.stdout.write(`- ${filename}\n`);
    archive.file(path.resolve(rootDir, filename), { name: filename });
  }

  archive.finalize();
  return archive;
}
