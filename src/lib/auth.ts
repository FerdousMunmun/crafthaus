import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins";
const client = new MongoClient(process.env.MONGO_DB_URI!);
const db = client.db(process.env.AUTH_DB_NAME!);


export const auth = betterAuth({

   database: mongodbAdapter(db, {
    client,
  }),
     emailAndPassword: { 
    enabled: true, 
  }, 

  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "user",
      },
    },
  },
 session:{
  cookieCache:{
    enabled:true,
    strategy:"jwt",
    maxAge:7*24*68*60

  }
},
  plugins:[
    jwt()
  ]
});


