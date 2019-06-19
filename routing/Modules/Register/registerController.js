angular.module("parisApp")
.controller("registerController", ['httpRequests', '$window', function (httpRequests, $window) {
    var self = this;

    self.start=function(){
        console.log("enter start")
        self.getQuestions();
        self.getCategories();
        self.getCountries();
    }

    self.getQuestions=function(){
        httpRequests.get("Users/getSecurityQuestions")
        .then (function (response){
            self.questions = response.data;
        }, function(response){
             //------------TODO OPTIONAL handle error------------------------

        });
    }

    self.getCategories=function(){  
        httpRequests.get("POIs/getPOIsCategories")
        .then (function (response){
            self.categories = response.data;
        }, function(response){
             //------------TODO OPTIONAL handle error------------------------

        });
    }

    self.getCountries=function(){
        //----------------TODO get countries from xml--------------
    }

    self.regValidation=function(){
        //----------------TODO validation--------------
        console.log("enter regValidation")
        self.register();
    }
    
    self.register=function(){
        console.log("enter register")
        let userDetails = {
            Username : self.Username,
            Password : self.Password,
            FirstName : self.FirstName,
            LastName : self.LastName,
            City : self.City,
            // Country : self.Country,
            Country : "Israel",
            Email : self.Email,
            // SecurityQ1 : self.SecurityQ1,
            // SecurityQ2 : self.SecurityQ2,
            // SecurityA1 : self.SecurityA1,
            // SecurityA2 : self.SecurityA2,
            // Categories : self.Categories
            SecurityQ1 : "{}",
            SecurityQ2 : "{}",
            SecurityA1 : "{}",
            SecurityA2 : "{}",
            Categories : "{}"
        };
        //-------------TODO registration details validation-----------------------
       httpRequests.post("Users/register",userDetails)
       .then(function(response){
           if (response.data.message == "Username already exists, please choose another one"){
               alert("This username already exists, please choose another one")
           }
           else if (response.data.message == "Registration succeeded"){
               alert("User was added successfully");
               // -------------------redirect to login page---------------------------
               $window.location.href = "#!/login";
           }
       },
       function(response){
             //------------TODO OPTIONAL handle error------------------------

       }) 
    }


}]);