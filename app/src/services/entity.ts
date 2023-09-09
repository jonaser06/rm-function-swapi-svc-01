export class SpeciesEntity {
    static querySpeciesParams = (id: any) => {
        const { DYN_SPECIES } = process.env;
        return {
            TableName: DYN_SPECIES || 'dyn-rm-swapi-02',
            KeyConditionExpression: 'id = :id',
            ExpressionAttributeValues: {
                ':id': { N : id },
            },
        };
    }
    static putSpeciesParams = (dynjson) => {
        const { DYN_SPECIES } = process.env;
        return {
            TableName: DYN_SPECIES || 'dyn-rm-swapi-02',
            Item: dynjson,
        }
    }
}