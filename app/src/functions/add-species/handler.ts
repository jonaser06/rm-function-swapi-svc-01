import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';

import { HttpResponse } from 'src/utils/response';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import { logger } from 'src/utils/logger';
import { findSpeciesInDynamo, saveSpeciesDynamo } from 'src/services/service';

const addspecies: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    const { body } = event;
    const { id } = event.body

    const findInDynamo = await findSpeciesInDynamo(id);
    if (findInDynamo.Items.length > 0) {
      logger.info('Error id already exists');
      return HttpResponse._400({
        message: 'Error id already exists',
      });
    }

    delete body.id;
    await saveSpeciesDynamo(Number(id), body);

    return HttpResponse._200({
      message: 'Saved species successfull',
    });
    
  } catch (error) {
    return HttpResponse._500({
      message: 'Error',
    });
  }

};

export const main = middyfy(addspecies);