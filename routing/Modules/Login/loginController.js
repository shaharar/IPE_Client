angular.module("parisApp")
.controller("loginController", ['httpRequests','$window','$rootScope', function (httpRequests,$window,$rootScope) {
    var self = this;

    // self.loginValidation=function(){

    //     console.log("enter login validation")
    //     self.login();
    // }

    self.login=function(){
        httpRequests.post("Users/login",self.currUser) 
        .then (function (response){
            if (response.data.message == "one or more fields required" || response.data.message == "invalid login attempt"){
                alert("The system could not log you in. Please make sure that you have filled all the required fields. If so, please make sure that you have filled in correct account details")
            }
            else{
                self.token=response.data.userToken;
                $rootScope.username = self.currUser.Username;
                $rootScope.isLogin = true;
                //-----------store user's token in session storage------------------
                $window.sessionStorage.setItem("userToken",self.token);
                $window.sessionStorage.setItem("username",self.currUser.Username);
                //-----------initialize user's favorites cache---------------------
                // favoritesCache.resetCache();
                self.getFavoritesPOIsOfUser();
                $rootScope.favoritesList =  $window.sessionStorage.getItem("favorites").split(',');
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

    self.getFavoritesPOIsOfUser=function(){
        httpRequests.get("POIs/private/getFavoritesPOIsOfUser/0")
        .then (function (response){
            var favorites = [];
            for (var i = 0; i < response.data.length; i++){
                favorites.push(response.data[i].ID);
            }
            $window.sessionStorage.setItem("favorites",favorites);
        },function(response){
    
        });
    }

    self.register=function(){
        // $location.path('/register')
        $window.location.href = "#!/register";
    }

    self.getUserQuestion=function(){
        console.log("enter Q")
        console.log(self.currUser.Username)
        // self.user.Username = self.currUser.Username;
        // console.log(self.user.Username)
        httpRequests.post("Users/getUserQuestions",self.currUser)
        .then (function (response){
            self.currUser.SecurityQ = response.data[0].Q1;
        },function(response){

        });
    }

    self.restorePassword=function(){
        //-------------user is a json of:'{ "Username":, "SecurityQ":, "SecurityA":}'-----------
        httpRequests.post("Users/retrievePassword", self.currUser) 
        .then (function (response){
                alert("Your Password is: " + response.data.message);
        },function(response){
            if(response.data.message =="invalid attemp to retrieve password"){
                alert("The system could not retrieve your password. Please make sure that you have submitted correct restore details");
            }
        });
    }

    self.forgotPassword=function(){
        console.log("HELLO")
        self.user.Username = self.currUser.Username;
        console.log(self.user.Username)
        self.getUserQuestion();
    }
    

}]);