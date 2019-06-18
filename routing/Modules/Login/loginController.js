angular.module("parisApp")
.controller("loginController", ['httpRequests','authentication', function (httpRequests,authentication) {
    var self = this;

    self.login=function(){
        httpRequests.post("Users/login",self.currUser)
        .then (function (response){
            if (response.data.message == "one or more fields required" || response.data.message == "invalid login attempt"){
                alert("The system could not log you in. Please make sure that you have filled all the required fields. If so, please make sure that you have filled in correct account details")
            }
            else{
                self.token=response.data.userToken;
                authentication.setToken(token);
                authentication.setCurrUser(self.currUser.username);

                //-----------TODO store user's token in local storage------------------

                //-----------TODO initialize user's favorites cache---------------------

                //-----------TODO redirect to home page---------------------
            } 
        });
    }

    self.register=function(){
        //-------------TODO redirect to registration page-----------
    }

    self.getUserQuestions=function(){
        httpRequests.get("Users/getUserQuestions")
        .then (function (response){
            self.user.SecurityQ = response.data[0];
        });
    }

    self.restorePassword=function(){
        //-------------user is a json of:'{ "Username":, "SecurityQ":, "SecurityA":}'-----------
        httpRequests.post("Users/retrievePassword", self.user) 
        .then (function (response){
            if(response.data.message =="invalid attemp to retrieve password"){
                alert("The system could not retrieve your password. Please make sure that you have submitted correct restore details");
            }
            else{
                alert("Password:" + response.data);
            }
        });
    }

}]);