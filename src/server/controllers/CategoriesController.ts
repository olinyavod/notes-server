import {ODataController, odata } from "odata-v4-server";
import {Category} from "../models/Category";

@odata.type(Category)
export class CategoriesController extends ODataController {
    
}