import { Router } from 'express';
import { RegistrationController } from '../controllers/registrationController';

const router = Router();
const ctrl = new RegistrationController();

router.get('/', (req, res) => ctrl.showForm(req, res));
router.post('/register', (req, res) => ctrl.registerParticipant(req, res));

export default router;
