sls.init:
	@echo "Initializing Serverless Framework"
	@sls create --template aws-nodejs-typescript --name $(SERVICE_NAME) --path ./app
	@echo "Serverless Framework initialized"

sls.start:
	@echo "Starting Serverless Framework"
	@npm run sls:dev --prefix ./app

sls.deploy:
	@echo "Deploying Serverless Framework"
	@npm run sls:deploy --prefix ./app

sls.test:
	@echo "Testing Serverless Framework"
	@npm run sls:test --prefix ./app