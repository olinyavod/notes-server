import {ODataQuery} from "odata-v4-server";

export interface ICrudProvider<TModel, TKey> {

    getByKey(key: TKey, query:ODataQuery): Promise<TModel>;

    get(query: ODataQuery): Promise<TModel>;

    getAll(query:ODataQuery): Promise<TModel[]>;

    filter(query: ODataQuery): Promise<TModel[]>;

    count(query: ODataQuery): Promise<number>;

    countAll(): Promise<number>;

    add(model: TModel): Promise<TModel>;

    update(key:TKey, model: TModel): Promise<TModel>;

    deleteByKey(key: TKey): Promise<number>;

    delete(query: ODataQuery): Promise<number>
}