import { 
    validateJSON_createEPF, 
    validateJSON_updateEPF, 
    validateParam_getEPF, 
    validateParam_deleteEPF 
  } from "../../middleware/validationMiddleware.js";

// Mock Express request and response objects
const mockRequest = (query) => ({ query });
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('Robustness/Fuzzy testing of deleteEPF API', () => {


  test('Test ID 1: Call next() when "epf_id" key exists in request query', () => {
    const req = mockRequest({
      epf_id: 1,
    });
    const res = mockResponse();
    const next = jest.fn();

    validateParam_deleteEPF(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  test('Test ID 2: Return 400 error when "epf_id" key is missing from request query', () => {
    const req = mockRequest({
      // "epf_id" key is missing
    });
    const res = mockResponse();
    const next = jest.fn();

    validateParam_deleteEPF(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Missing epf_id key for delete EPF query' });
  });


});



