//If you want to set up a profile page that renders data from clerk you need:
//auth() ==> userID
//Current Uder ==> username, email adress etc.
//the data rendered here comes from 2 places. - data collected by clerk the other data comes from the user table 

export default async function UserPage(){
const user = await currentUser
return (
    <>
    <h1> User page </h1>
    <h2> Welcome, {user?.firstname}</h2>
    <h2> {user?.lastname}</h2>
    <p>{user.emailAdresses[0]}</p>
    </>
)
}