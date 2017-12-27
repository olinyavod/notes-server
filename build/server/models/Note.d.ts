import { ObjectID } from "mongodb";
export declare class Note {
    _id: ObjectID;
    title: string;
    body: string;
    categoryId: ObjectID;
}
