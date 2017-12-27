import { ODataServer, ODataController, odata, Edm } from "odata-v4-server";
import {CategoriesController} from "./controllers/CategoriesController";
import {NotesController} from "./controllers/NotesController";

@odata.cors
@odata.namespace("iNotes")
@odata.controller(CategoriesController, true)
@odata.controller(NotesController, "Notes")
export class NotesServer extends ODataServer {
    
}