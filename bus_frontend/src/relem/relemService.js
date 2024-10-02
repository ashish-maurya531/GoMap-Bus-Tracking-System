import * as Realm from "realm-web"
// require('dotenv').config();
const APP_ID=import.meta.env.VITE_APP_ID;
const app=new Realm.App(APP_ID);


//create user

export const userCreation=async(email,pass)=>{
    try{
        // console.log("------------"+email,pass)
        await app.emailPasswordAuth.registerUser({email: email, password:pass})
        console.log("relem user created successfully")
        // console.log(ADMIN_API_URL);
        // console.log(API_KEY);

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
            
                console.log("Relem user deleted successfully");
        
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
export const updateRelemUser= async(userEmail,userOldPassword,userPassword)=>{
    try{
        // console.log("-------------"+userEmail,userOldPassword,userPassword)
        await deleteRelemUser(userEmail,userOldPassword);
        await userCreation(userEmail,userPassword);
        
        
        
        console.log("User updated successfully");
    }
    catch (error) {
        console.log("Error updating user", JSON.stringify(error));
    }
}




