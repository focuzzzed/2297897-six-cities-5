import {createHmac} from 'node:crypto';

export function createSHA(line: string, salt: string) {
  const shaHasher = createHmac('sha256', salt);
  return shaHasher.update(line).digest('hex');
}
