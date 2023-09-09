import axios from "axios";
import { Species } from "src/utils/interfaces";
import { attributeTranslations } from "src/utils/constants";
import dynamo from "src/adapters/dynamo";
import { Formats } from "src/utils/formats";
import { SpeciesEntity } from "./entity";
import { logger } from "src/utils/logger";
export const listSpeciesService = async (id: string) => {
    try {
        const response = await axios.get(`https://swapi.py4e.com/api/species/${id}`);
        return response.data;
    }
    catch (error) {
        return error;
    }
}

export const translateResponseService = async (response: Species) => {
    const originalResponse: Species = { ...response };
    const translatedresponse: Record<string, any> = {};
    for(const key in originalResponse ){
        if (key in attributeTranslations ) {
            translatedresponse[attributeTranslations[key]] = originalResponse[key];
        } else {
            translatedresponse[key] = originalResponse[key];
        }
    }
    return translatedresponse;
}

export const findSpeciesInDynamo = async (id: any) => {
    try {
        const speciesParams = SpeciesEntity.querySpeciesParams(id);
        const response = await dynamo.query(speciesParams)
        logger.info(`::${JSON.stringify(response)}::`);
        return response;
    }
    catch (error) {
        logger.error(`::${JSON.stringify(error)}::`);
        return error;
    }
}

export const saveSpeciesDynamo = async (id: number, species: any) => {
    try {
        const payload = { id: id, payload: JSON.stringify(species)};
        const payloadDynamo = Formats.convertToDynamoJSON(payload);
        const speciesParams = SpeciesEntity.putSpeciesParams(payloadDynamo);
        const response = await dynamo.put(speciesParams)
        logger.info(`::${JSON.stringify(response)}::`);
        return response;
    }
    catch (error) {
        logger.error(`::${JSON.stringify(error)}::`);
        return error;
    }
}