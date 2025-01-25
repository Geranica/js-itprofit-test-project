import { HTTPService } from '../../services/httpService/httpService';
import { API_ENDPOINTS } from '../../shared/apiEndpoints';

const httpService = new HTTPService();

export const formSubmit = async (data) => {
  try {
    return httpService.postRequest(API_ENDPOINTS.USER_FEDDBACK.POST_FEEDBACK, data);
  } catch (error) {
    throw error;
  }
};
