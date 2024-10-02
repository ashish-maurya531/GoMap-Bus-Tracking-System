import * as Realm from "realm-web"
required('dotenv').config();
const APP_ID=process.env.APP_ID;
const app=new Realm.App(APP_ID);


//create user

export const userCreation=async(email,pass)=>{
    try{
        await app.emailPasswordAuth.registerUser({email: email, password:pass})
        console.log("relem user created successfully")
        

    }
    catch(error){
        console.log("error creating user",error)
    }


}

//delete user from relem
export const deleteRelemUser = async(userEmail,userPassword)=>{
    try {
        console.log(userEmail,userPassword)
        
        await app.logIn(Realm.Credentials.emailPassword(userEmail, userPassword));
       
        console.log("Current user:", app.currentUser);
        try{
            await app.deleteUser({userId:`${userEmail}`});
            
        }
        catch(error){
            if (error.message=="The user was never logged into this app"){
                console.log("User deleted successfully");
            }
            else{
                console.log("something went wrong");
            }  
        }
    }
    catch (error) {
        JSON.stringify(error);
        if (error.statusCode==401){
            console.log("User not found");
        }
        else{
            console.log("something went wrong2");
        }
        
    
    }
        

}


//update user from relem
export const updateRelemUser= async(userEmail,userPassword)=>{
    try{
        console.log(userEmail,userPassword)
        const user = await app.logIn(Realm.Credentials.emailPassword(userEmail, userPassword));
        console.log("Current user:", app.currentUser);
        const currentUser = app.currentUser; // This should be your authenticated user
        if (!currentUser) {
            throw new Error("User not authenticated");
        }
        const args = [];
        await app.emailPasswordAuth.callResetPasswordFunction(
        { email:userEmail, password:userPassword },
        args
        );
        console.log("User updated successfully");
    }
    catch (error) {
        console.log("Error updating user", error);
    }
}




