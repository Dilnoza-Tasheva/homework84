import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import Task from "./models/Task";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('users');
        await db.dropCollection('tasks');
    } catch (e) {
        console.log("Collections were not present");
    }

    const [user1, user2] = await User.create(
        {
            username: "john_doe",
            password: "Password123",
            token: crypto.randomUUID(),
        },
        {
            username: "jane_doe",
            password: "SecurePass456",
            token: crypto.randomUUID(),
        }
    );

    await Task.create(
        {
            user: user1._id,
            title: "Buy groceries",
            description: "Milk, eggs, bread, and carrots",
            status: "new",
        },
        {
            user: user1._id,
            title: "Call the Demir bank",
            description: "Resolve the credit card issue",
            status: "in progress",
        },
        {
            user: user2._id,
            title: "Schedule a dentist appointment",
            description: "Check for available slots next week",
            status: "complete",
        }
    );
    await db.close();
};

run().catch(console.error);
