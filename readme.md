# Readme

## Installation Steps
1. npm init -y
2. npm install pg
3. npm i express

## API Routes for EXCOs
1. Create EXCO (POST Request, requires JSON Body): localhost:3000/users/createEXCO
2. Get EXCOs (GET Request): localhost:3000/users/getEXCOs
3. Get EXCO (GET Request, requires JSON Body): localhost:3000/users/getEXCO
4. Get EXCO EPFs (GET Request, requires JSON Body): localhost:3000/users/getEXCOEPFs
5. Update EXCO (PUT Request, requires JSON Body): localhost:3000/users/updateEXCO
6. Delete EXCO (DELETE Request, requires JSON Body): localhost:3000/users/deleteEXCO

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

