import express from "express";
import auth, {RequestWithUser} from "../middleware/auth";
import Task from "../models/Task";

const taskRouter = express.Router();

taskRouter.post('/', auth, async (req, res, next) => {
    let expressReq = req as RequestWithUser
    const user = expressReq.user;
    try {
        if (!user) {
            res.status(401).send({error: 'No user found!'});
            return;
        }
        const task = new Task({
            user: user._id,
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
        });

        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send({error: 'Failed validation'});
    }
});

taskRouter.get('/', auth, async (req, res) => {
    let expressReq = req as RequestWithUser
    const user = expressReq.user;
    try {
        if (!user) {
            res.status(401).send({error: 'No user found!'});
            return;
        }
        const tasks = await Task.find({user: user._id});
        res.send(tasks);
    } catch (error) {
        res.status(500).send({error: 'Could not get tasks'});
    }
});

taskRouter.put('/:id', auth, async (req, res) => {
    let expressReq = req as RequestWithUser
    const user = expressReq.user;
    try {
        if (!user) {
            res.status(401).send({error: 'No user found!'});
            return;
        }
        const task = await Task.findOne({_id: req.params.id, user: user._id})
        if (!task) {
            res.status(403).send({ error: 'Task not found!' });
            return;
        }
        const updates = req.body;
        Object.keys(updates).forEach((key) => {
            if (key !== "user") {
                (task as any)[key] = updates[key];
            }
        });
        await task.save();
        res.send(task);

    } catch (error) {
        res.status(400).send({ error: 'Could not update task'});
    }
});

taskRouter.delete("/:id", auth, async (req, res) => {
    let expressReq = req as RequestWithUser
    const user = expressReq.user;
    try {
        if (!user) {
            res.status(401).send({error: 'No user found!'});
            return;
        }

        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            user: user._id,
        });

        if (!task) {
            res.status(403).send({ error: 'Task not found!' });
            return;
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).send({ error: 'Could not delete task'});
    }
});

export default taskRouter;