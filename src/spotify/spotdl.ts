import { exec } from 'child_process';
import fs from 'fs';

export const downloadMP3 = (trackId: string) => {
  const output = __dirname + '/../../../mp3/{track-id}';
  return new Promise<string | null>((resolve, reject) => {
    try {
      exec(
        `spotdl https://open.spotify.com/track/${trackId} --client-id ${process.env.SPOTIFY_CLIENT_ID} --client-secret ${process.env.SPOTIFY_CLIENT_SECRET} --format mp3 --output ${output}`,
        (err, stdout, stderr) => {
          if (err) {
            console.log(err);
            return resolve(null);
          }
          console.log(stdout);
          const dist = output.replace('{track-id}', `${trackId}.mp3`);
          const mp3 = fs.readFileSync(dist);
          const isExists = mp3 && mp3.length;
          if (!isExists) {
            return resolve(null);
          }
          return resolve(dist);
        },
      );
    } catch (err) {
      console.log(err);
      resolve(null);
    }
  });
};
