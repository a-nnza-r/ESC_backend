import { 
    validateJSON_createEPF, 
    validateJSON_updateEPF, 
    validateParam_getEPF, 
    validateParam_deleteEPF 
  } from "../../middleware/validationMiddleware.js";
import path from "path";
import fs from "fs";
import { randomBytes } from "crypto";

const jsonFilePath = path.join(__dirname, 'updateEPF_testjson', 'updateEPF_test1.json');
const jsonData = fs.readFileSync(jsonFilePath, 'utf-8');
const valid_req_body = JSON.parse(jsonData);

// Mock Express request and response objects
const mockRequest = (body) => ({ body });
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('Robustness/Fuzzy testing of updateEPF API', () => {



  test('Test ID 1: Call next() when payload is valid', () => {
    const req = mockRequest(valid_req_body);
    const res = mockResponse();
    const next = jest.fn();

    validateJSON_updateEPF(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });


  test('Test ID 2: Return 400 error when JSON payload is incomplete', () => {
    const req = mockRequest({
      "status": "Pending",
      "exco_user_id": "1",
      "a_name": "user 1"});
    const res = mockResponse();
    const next = jest.fn();

    validateJSON_updateEPF(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid JSON payload format for updateEPF' });
  });

  test('Test ID 3: Return 400 error when payload is invalid', () => {
    const randomBytesData = randomBytes(100);
    const req = mockRequest(randomBytesData);
    const res = mockResponse();
    const next = jest.fn();

    validateJSON_updateEPF(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid JSON payload format for updateEPF' });
  });





});





