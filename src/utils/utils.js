import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// Obtener la ruta del archivo actual
const __filename = fileURLToPath(import.meta.url);

// Obtener el directorio del archivo actual
const currentDir = dirname(__filename);

// Resuelve la ruta al directorio src
export const __dirname = resolve(currentDir, '..');