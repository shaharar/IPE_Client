angular.module("parisApp")
.controller("registerController", ['httpRequests', function (httpRequests) {
    var self = this;

    self.start=function(){
        self.getQuestions();
        self.getCategories();
        self.getCountries();

    }

    self.getQuestions=function(){
        httpRequests.get("Users/getQuestions")
        .then (function (response){
            self.questions = response.data;
        });
    }

    self.getCategories=function(){  
        httpRequests.get("POIs/getPOIsCategories")
        .then (function (response){
            self.categories = response.data;
        });
    }

    self.getCountries=function(){
        //----------------TODO get countries from xml--------------
    }

    self.register=function(){
        let userDetails = {
            Username : self.Username,
            Password : self.Password,
            FirstName : self.FirstName,
            LastName : self.LastName,
            City : self.City,
            Country : self.Country,
            Email : self.Email,
            SecurityQ1 : self.SecurityQ1,
            SecurityQ2 : self.SecurityQ2,
            SecurityA1 : self.SecurityA1,
            SecurityA2 : self.SecurityA2,
            Categories : self.Categories
        };
        //-------------TODO registration details validation-----------------------
       httpRequests.post("Users/register",userDetails)
       .then(function(response){
           if (response.data.message == "Username already exists, please choose another one"){
               alert("This username already exists, please choose another one")
           }
           else if (response.data.message == "Registration succeeded"){
               alert("User was added successfully");
               // -------------------TODO redirect login page---------------------------
           }
       }) 
    }


}]);