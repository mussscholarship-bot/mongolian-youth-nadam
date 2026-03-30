import { Router, Request, Response, NextFunction } from 'express';
import { AdminController } from '../controllers/adminController';

const router = Router();
const ctrl = new AdminController();

// Auth middleware
function requireAdmin(req: Request, res: Response, next: NextFunction): void {
    if ((req.session as any).isAdmin) {
        next();
    } else {
        res.redirect('/admin/login');
    }
}

router.get('/login', (req, res) => ctrl.showLogin(req, res));
router.post('/login', (req, res) => ctrl.login(req, res));
router.get('/logout', (req, res) => ctrl.logout(req, res));

router.get('/registrations', requireAdmin, (req, res) => ctrl.viewRegistrations(req, res));
router.get('/export', requireAdmin, (req, res) => ctrl.exportParticipantData(req, res));
router.post('/toggle-payment/:id', requireAdmin, (req, res) => ctrl.togglePayment(req, res));
router.post('/delete/:id', requireAdmin, (req, res) => ctrl.deleteParticipant(req, res));

export default router;
