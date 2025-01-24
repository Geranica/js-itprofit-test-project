import { HTTPService } from '../../services/httpService/httpService';
import { API_ENDPOINTS } from '../../shared/apiEndpoints';

const httpService = new HTTPService();

export const formSubmit = async (data) => {
  try {
    const result = await httpService.postRequest(API_ENDPOINTS.USER_FEDDBACK.POST_FEEDBACK, data);
    return result;
  } catch (error) {
    throw error;
  }
};
