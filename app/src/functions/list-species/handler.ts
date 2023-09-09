import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';

import { HttpResponse } from 'src/utils/response';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import { findSpeciesInDynamo, listSpeciesService, saveSpeciesDynamo, translateResponseService } from 'src/services/service';
import { Species } from 'src/utils/interfaces';
import { logger } from 'src/utils/logger';

export const listspecies: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    const { id } = event.pathParameters;
    const findInDynamo = await findSpeciesInDynamo(id);
    if (findInDynamo.Items.length > 0) {
      
      logger.info('Success from dynamo');
      return HttpResponse._200({
        message: 'Success from dynamo',
        data: JSON.parse(findInDynamo.Items[0].payload),
      });
    }

    const originalResponse : Species = await listSpeciesService(id);
    const translatedResponse = await translateResponseService(originalResponse);
    await saveSpeciesDynamo(Number(id), translatedResponse);

    logger.info('Success from swapi');
    return HttpResponse._200({
      message: 'Success from swapi',
      data: translatedResponse,
    });
  } catch (error) {
    return HttpResponse._500({
      message: 'Error',
    });
  }

};

export const main = middyfy(listspecies);