import { Router } from 'express';
const router = Router();
import { throwError} from "../utils.js"


router.get('/', (req, res) => {
  res.send('Admin dashboard');
});
 
router.delete('/user/:id', (req, res) => {
  res.send(`Deleted user ${req.params.id}`);
});

export default router;