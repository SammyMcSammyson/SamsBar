export default async function IDPage ({params}){
    const myParams = await params;
        return (<>
    <h1> Post Number {myParams.id}</h1>
    </>);

}