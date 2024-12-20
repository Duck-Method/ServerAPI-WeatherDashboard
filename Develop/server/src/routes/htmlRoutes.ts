import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Router, Request, Response} from 'express';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();

// TODO: Define route to serve index.html
router.get('/', (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

export default router;
