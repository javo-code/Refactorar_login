import { MessageModel } from "./models/chat.model.js";

export default class MessageDaoMongoDB {
    async getAll() {
        try {
        const response = await MessageModel.find({});
        return response;
        } catch (error) {
        console.log(error);
        }
    }

    async getById(id) {
        try {
            const response = await MessageModel.findById(id);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async create(obj) {
        try {
            const response = await MessageModel.create(obj);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async update(id, obj) {
        try {
            return await MessageModel.findByIdAndUpdate({ _id: id }, obj, {
            new: true,
            });
        } catch (error) {
            console.log(error);
        }
    }

    async delete(id) {
        try {
            return await MessageModel.findByIdAndDelete(id);
        } catch (error) {
            console.log(error);
        }
    }
}
