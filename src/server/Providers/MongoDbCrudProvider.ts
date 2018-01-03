import {ObjectID, Db, MongoClient} from "mongodb";
import {ODataQuery} from "odata-v4-server";
import {createQuery} from "odata-v4-mongodb";
import {ICrudProvider} from "./ICrudProvider";
import {Token} from "odata-v4-parser/lib/lexer";

export class MongoDbCrudProvider<TModel> implements ICrudProvider<TModel, string> {

	constructor(protected readonly collectionName:string, private readonly  connectionString:string) {
	    
	}

	protected async connect(): Promise<Db> {
	    return await MongoClient.connect(this.connectionString);
	}

    async getByKey(key: string, query: ODataQuery): Promise<TModel> {
        const db = await this.connect();
        try {
            const mongoQuery = createQuery(query);
            const keyId = new ObjectID(key);
            return await db.collection(this.collectionName)
                .findOne({ _id: keyId }, { fields: mongoQuery.projection });
        } finally {
           db.close(); 
        }
    }

    async get(query: ODataQuery): Promise<TModel> {
        const db = await this.connect();
        try {
            let mongoQuery = createQuery(query);
            if (typeof mongoQuery.query._id == "string") mongoQuery.query._id = new ObjectID(mongoQuery.query._id);

            return await db.collection(this.collectionName)
                .findOne(mongoQuery.query, { fields: mongoQuery.projection });

        }finally {
            db.close();
        }
    }


    async getAll(query: ODataQuery): Promise<TModel[]> {
        const db = await this.connect();
        try {
            var mongoQuery = createQuery(query);
            let result = typeof mongoQuery.limit == "number" && mongoQuery.limit === 0
                ? []
                : await db.collection(this.collectionName)
                .find()
                .project(mongoQuery.projection)
                .skip(mongoQuery.skip || 0)
                .limit(mongoQuery.limit || 0)
                .sort(mongoQuery.sort)
                    .toArray();
            if (mongoQuery.inlinecount) {
                (result as any).inlinecount = await db.collection(this.collectionName)
                    .find()
                    .count(false);
            }
            return result;
            } finally {
            db.close();
        }
    }

    async filter(query: ODataQuery): Promise<TModel[]> { 
		const db = await this.connect();
        try {
            var mongoQuery = createQuery(query);
            let result = typeof mongoQuery.limit == "number" && mongoQuery.limit === 0
                ? []
                : await db.collection(this.collectionName)
                .find(mongoQuery.query)
                .project(mongoQuery.projection)
                .skip(mongoQuery.skip || 0)
                .limit(mongoQuery.limit || 0)
                .sort(mongoQuery.sort)
                    .toArray();
            if (mongoQuery.inlinecount) {
                (result as any).inlinecount = await db.collection(this.collectionName)
                    .find(mongoQuery.query)
                    .count(false);
            }
            return result;
            } finally {
            db.close();
        }
	}

    async count(query: ODataQuery): Promise<number> { 
		const db = await this.connect();
		try{
			const mongoQuery = createQuery(query);
			return await db.collection(this.collectionName)
				.find(mongoQuery.query)
				.count(false);
		}finally{
			db.close();
		}
	}

   async countAll(): Promise<number> {
		const db = await this.connect();
		try{
			return await db.collection(this.collectionName)
				.find()
				.count(false);
		}finally{
			db.close();
		}
	}

    add(model: TModel): Promise<TModel> {
		const db = this.connect();
		try{
			return await db.colllection(this.collectionName).insertOne(model).then(r =>{
				model._id = r.insertedId;
				return model;
			});
		}finally{
			db.close();
		}
	}

    update(key: string, model: TModel): Promise<TModel> { throw new Error("Not implemented"); }

    delete(query: Token): Promise<number> {
        throw new Error("Not implemented");
    }

    deleteByKey(key: string): Promise<number> {
        throw new Error("Not implemented");
    }
}