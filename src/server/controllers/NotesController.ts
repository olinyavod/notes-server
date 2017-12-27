import { ODataController, odata } from "odata-v4-server";
import {Note} from "../models/Note";

@odata.type(Note)
export class NotesController extends ODataController {
    
}