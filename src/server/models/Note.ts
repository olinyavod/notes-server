import { ObjectID } from "mongodb";

export class Note {
    _id: ObjectID;
    title: string; body: string;
    categoryId: ObjectID;
}






