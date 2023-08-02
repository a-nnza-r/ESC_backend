import {  
    validateParam_getUser
  } from "../../middleware/validationMiddleware_User.js";

import { randomBytes } from "crypto";

// Mock Express request and response objects
const mockRequest = (query) => ({ query });
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('Robustness/Fuzzy testing of getUser API', () => {


  test('Test ID 1: Call next() when "user_id" key exists in request query', () => {
    const req = mockRequest({
      user_id: 1,
    });
    const res = mockResponse();
    const next = jest.fn();

    validateParam_getUser(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  test('Test ID 2: Return 400 error when "user_id" key is missing from request query', () => {
    const req = mockRequest({
      // "user_id" key is missing
    });
    const res = mockResponse();
    const next = jest.fn();

    validateParam_getUser(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Missing user_id key for get User query' });
  });

  test('Test ID 3: Return 400 error when request query is invalid', () => {
    const randomBytesData = randomBytes(100);
    const req = mockRequest(randomBytesData);
    const res = mockResponse();
    const next = jest.fn();

    validateParam_getUser(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Missing user_id key for get User query' });
  });


});



