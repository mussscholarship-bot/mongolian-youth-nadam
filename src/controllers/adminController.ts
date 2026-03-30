import { Request, Response } from 'express';
import { RegistrationService } from '../services/registrationService';

const registrationService = new RegistrationService();

const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'admin123';

export class AdminController {
    showLogin(req: Request, res: Response): void {
        res.render('admin/login', { error: null });
    }

    login(req: Request, res: Response): void {
        const { username, password } = req.body;
        if (username === ADMIN_USER && password === ADMIN_PASS) {
            (req.session as any).isAdmin = true;
            res.redirect('/admin/registrations');
        } else {
            res.render('admin/login', { error: 'ユーザー名またはパスワードが間違っています。' });
        }
    }

    logout(req: Request, res: Response): void {
        req.session.destroy(() => {
            res.redirect('/admin/login');
        });
    }

    async viewRegistrations(req: Request, res: Response): Promise<void> {
        try {
            const participants = await registrationService.getAllParticipants();
            res.render('admin/dashboard', { participants });
        } catch (error) {
            res.status(500).send('サーバーエラーが発生しました。');
        }
    }

    async exportParticipantData(req: Request, res: Response): Promise<void> {
        try {
            const participants = await registrationService.getAllParticipants();
            const headers = ['ID', '名前', 'メール', '性別', '職業', '電話', '出身地', '現住所', '支払い状態', '登録日'];
            const rows = participants.map(p => [
                String(p._id),
                String(p.name),
                String(p.email),
                String(p.gender),
                String(p.occupation),
                String(p.phone),
                String(p.hometown),
                String(p.current_address),
                p.payment_status ? '支払済' : '未払い',
                p.created_at.toISOString(),
            ]);
            const csv = [headers, ...rows].map(r => r.map(v => `"${v}"`).join(',')).join('\n');
            res.setHeader('Content-Type', 'text/csv; charset=utf-8');
            res.setHeader('Content-Disposition', 'attachment; filename="participants.csv"');
            res.send('\uFEFF' + csv); // BOM for Excel
        } catch (error) {
            res.status(500).send('エクスポートエラー');
        }
    }

    async togglePayment(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params['id'] as string;
            const participant = await registrationService.findParticipantById(id);
            if (!participant) {
                res.status(404).send('Not found');
                return;
            }
            await registrationService.updatePaymentStatus(id, !participant.payment_status);
            res.redirect('/admin/registrations');
        } catch (error) {
            res.status(500).send('エラーが発生しました。');
        }
    }

    async deleteParticipant(req: Request, res: Response): Promise<void> {
        try {
            await registrationService.deleteParticipant(req.params['id'] as string);
            res.redirect('/admin/registrations');
        } catch (error) {
            res.status(500).send('削除エラー');
        }
    }
}
