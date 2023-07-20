# Readme

## Installation Steps
1. npm init -y
2. npm install pg
3. npm i express
4. npm i multer
5. npm i dotenv
6. npm i cors

## API Routes for EXCOs
1. Create EXCO (POST Request, requires JSON Body): localhost:3000/users/createEXCO
2. Get EXCOs (GET Request): localhost:3000/users/getEXCOs
3. Get EXCO (GET Request, requires JSON Params): localhost:3000/users/getEXCO
4. Get EXCO EPFs (GET Request, requires JSON Params): localhost:3000/users/getEXCOEPFs
5. Update EXCO (PUT Request, requires JSON Body): localhost:3000/users/updateEXCO
6. Delete EXCO (DELETE Request, requires JSON Body): localhost:3000/users/deleteEXCO

## API Routes for OSLs
1. Create OSL (POST Request, requires JSON Body): localhost:3000/users/createOSL
2. Get OSLs (GET Request): localhost:3000/users/getOSLs
3. Get OSL (GET Request, requires JSON Params): localhost:3000/users/getOSL
4. Update OSL (PUT Request, requires JSON Body): localhost:3000/users/updateOSL
5. Delete OSL (DELETE Request, requires JSON Body): localhost:3000/users/deleteOSL

## API Routes for ROOTs
1. Create ROOT (POST Request, requires JSON Body): localhost:3000/users/createROOT
2. Get ROOTs (GET Request): localhost:3000/users/getROOTs
3. Get ROOT (GET Request, requires JSON Params): localhost:3000/users/getROOT
4. Update ROOT (PUT Request, requires JSON Body): localhost:3000/users/updateROOT
5. Delete ROOT (DELETE Request, requires JSON Body): localhost:3000/users/deleteROOT

## API Routes for EPFs
1. Create EPF (POST Request, requires JSON Body): localhost:3000/epfs/createEPF
2. Get EPF (GET Request, requires JSON Body): localhost:3000/epfs/getEPF
3. Get EPFs (GET Request): localhost:3000/epfs/getEPFs 
4. Update EPF (PUT Request, requires JSON Body): localhost:3000/epfs/updateEPF
5. Delete EPF (DELETE Request, requires JSON Body): localhost:3000/epfs/deleteEPF

## API Routes for FILEs
1. Upload files (POST Request, requires form-data body): localhost:3000/files/uploadFiles
2. Get files (GET Request, requires JSON body): localhost:3000/files/getFiles
3. Delete files (GET Request, requires JSON Body): localhost:3000/files/deleteFiles

