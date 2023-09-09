// @aws-sdk/client-dynamodb
import { DynamoDBClient, GetItemCommand, PutItemCommand, QueryCommand, ScanCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { logger } from "src/utils/logger";

class DynamoDB{
    private dynamoClient: DynamoDBClient;
    constructor(){
        this.dynamoClient = new DynamoDBClient({ region: process.env.REGION || "us-east-1" });
    }
    async scan(params: any){
        const command = new ScanCommand(params);
        try {
            const response = await this.dynamoClient.send(command);
            response.Items = this.formatJson(response.Items);
            return response;
        } catch (error) {
            console.error("❌ Error scanning DynamoDB:", error);
            throw error;
        }
    }
    
    async query(params: any){
        const command = new QueryCommand(params);
        try {
            const response = await this.dynamoClient.send(command);
            response.Items = this.formatJson(response.Items);
            return response;
        } catch (error) {
            return error;
        }
    }

    async put(params: any){
        const command = new PutItemCommand(params);
        try {
            const response = await this.dynamoClient.send(command);
            return response;
        } catch (error) {
            console.error("❌ Error querying DynamoDB:", error);
            throw error;
        }
    }

    async updateItem(params: any){
        const command = new UpdateItemCommand(params);
        try {
            const response = await this.dynamoClient.send(command);
            return response;
        } catch (error) {
            console.error("❌ Error updating item in DynamoDB:", error);
            throw error;
        }
    }

    formatJson(items: any) {
        return items.map((item: any) => {
            const formattedItem: any = {};
            for (const key of Object.keys(item)) {
                formattedItem[key] = Object.values(item[key])[0];
            }
            return formattedItem;
        });
    }
}

export default new DynamoDB();