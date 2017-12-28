import {ODataController, ODataQuery, odata } from "odata-v4-server";
import {ICrudProvider} from "../Providers/ICrudProvider";

export abstract class ModelControllerBase<TModel, TKey> extends ODataController {

    constructor(protected readonly provider: ICrudProvider<TModel, TKey>) {
        super();
    }
	
	@odata.GET
	async find(@odata.query query: ODataQuery): Promise<TModel[]> {
	    return await this.provider.filter(query);
	}

	@odata.GET
	async findOne(@odata.key key: TKey, @odata.query query: ODataQuery): Promise<TModel> {
	    return await this.provider.getByKey(key, query);
    }

	@odata.POST
    async insert( @odata.body data: any): Promise<TModel> {
        return await this.provider.add(data);
    }

    @odata.PUT
    async upsert(@odata.key key: TKey, @odata.body data: any, @odata.context context: any): Promise<TModel> {
        return await this.provider.update(key, data);
    }

    @odata.DELETE
    async remove( @odata.key key: TKey): Promise<number> {
        return await this.provider.deleteByKey(key);
    }
}