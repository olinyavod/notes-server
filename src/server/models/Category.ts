import { ObjectID } from "mongodb";
import { Edm } from "odata-v4-server";
import {Note} from "./Note";

@Edm.Annotate({
    term: "Categories",
    string: "Categories"
})
export class Category {

    @Edm.Key
    @Edm.String
    @Edm.Computed
    _id: ObjectID;

    @Edm.String
    Title: string;

    @Edm.Collection(Edm.EntityType("Note"))
    @Edm.Partner("Category")
    Notes:Note[];
}