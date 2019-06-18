angular.module("parisApp")
.controller("loginController", ['httpRequests','authentication','$window','$rootScope', function (httpRequests,authentication,$window,$rootScope) {
    var self = this;

    self.loginValidation=function(){
        console.log("enter login validation")

        self.login();
    }

    self.login=function(){
        console.log("entered login")
        httpRequests.post("Users/login",self.currUser) 
        .then (function (response){
            if (response.data.message == "one or more fields required" || response.data.message == "invalid login attempt"){
                alert("The system could not log you in. Please make sure that you have filled all the required fields. If so, please make sure that you have filled in correct account details")
            }
            else{
                self.token=response.data.userToken;
                console.log(self.token);
               authentication.setCurrUser(self.currUser);
                console.log($rootScope.username);
                //-----------store user's token in session storage------------------
              $window.sessionStorage.setItem("userToken",self.token);
              console.log("header- " + $window.sessionStorage.getItem("userToken"))
                //-----------initialize user's favorites cache---------------------
                // favoritesCache.resetCache();
                //-----------redirect to home page---------------------
                $window.location.href = "#!/";
            } 
        } ,function(response){
            if (response.data.message == "one or more fields required" || response.data.message == "invalid login attempt"){
                alert("The system could not log you in. Please make sure that you have filled all the required fields. If so, please make sure that you have filled in correct account details")
            }            
            else{
                alert("Oops..the system failed to log you in")
            }
        });
    }

    self.register=function(){
        $location.path('/register')
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