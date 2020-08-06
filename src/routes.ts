import express from 'express';
import db from './database/connection';
import convertHourToMinute from './utils/convertHourToMinutes';

const routes = express.Router();

interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
}

routes.post('/classes', async (request, response) => {
    const {
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost,
        schedule
    } = request.body;

    const trx = await db.transaction();

    try {
        const insertedUsersId = await trx('users').insert({
            name,
            avatar,
            whatsapp,
            bio,
        }, ['id']);

        const user_id = insertedUsersId[0].id;

        const insertedClassesId = await trx('classes').insert({
            subject,
            cost,
            user_id,
        }, ['id']);

        const class_id = insertedClassesId[0].id;

        const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
            return {
                class_id,
                week_day: scheduleItem.week_day,
                from: convertHourToMinute(scheduleItem.from),
                to: convertHourToMinute(scheduleItem.to),
            };
        });

        await trx('class_schedule').insert(classSchedule);

        trx.commit();

        return response.status(201).send();
    } catch (err) {
        await trx.rollback();
        return response.status(400).json({
            error: 'Unexpected error while creating new class',
        });
    }

});

export default routes;
