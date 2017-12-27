import { ObjectID } from "mongodb";
import { Edm } from "odata-v4-server";
import {Category} from "./Category";

@Edm.Annotate({
    term: "Notes",
    string: "Notes"
})
export class Note {

    @Edm.Key
    @Edm.Computed
    @Edm.String
    _id: ObjectID;

    @Edm.String
    Title: string;

    @Edm.String
    Body: string;

    @Edm.String
    @Edm.Required
    CategoryId: ObjectID;

    @Edm.EntityType("Category")
    @Edm.Partner("Nodes")
    Category:Category;
}






