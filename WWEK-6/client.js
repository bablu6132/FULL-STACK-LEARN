const http=require(`http`);
var options={
    hostname:`localhost`,
    port:8088,
    path:`/`,
    method:`GET`

};
function handleResponse(response){
    var serverData='';
    response.on(`data`,function(chunk){
        serverData+=chunk;
    });
    response.on(`end`,function(){
        console.log("Response Status:", response.statusCode);
        console.log("Response Headers:", response.headers);
        console.log("Response Body:");
        console.log(serverData);
    });
}
var request =http.request(options,function(response){
    handleResponse(response);
});
request.on(`error`,function(error){
    consoe.log("Request Error:",error);
    console.log("Request Code:",error.message);
});
request.end();
