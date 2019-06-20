angular.module("parisApp")
.controller("registerController", ['httpRequests', '$window','$rootScope', function (httpRequests, $window,$rootScope) {
    var self = this;

    self.start=function(){
        self.chosenCategories = [];
        self.getQuestions();
        self.getCategories();
        self.getCountries();
    }

    self.getQuestions=function(){
        httpRequests.get("Users/getSecurityQuestions")
        .then (function (response){
            var SecQuestions = [];
            for (var i = 0; i < response.data.length; i++){
                SecQuestions.push(response.data[i].Question);
            }
            self.questions = SecQuestions;
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

    /*get countries from xml*/
    self.getCountries=function(){
        var i;
        var xmlDoc = $rootScope.myXML.responseXML;
        var allCountries = [];
        var x = xmlDoc.getElementsByTagName("Country");
        for (i = 0; i < x.length; i++) {
            allCountries.push(x[i].getElementsByTagName("Name")[0].childNodes[0].nodeValue.toString());
        }
        self.countries = allCountries;
    }

    self.chooseCategories=function (category) {
        var idx = self.chosenCategories.indexOf(category);
        if (idx == -1) {
            self.chosenCategories.push(category);
        }
        else {
            self.chosenCategories.splice(idx, 1);
        }
    }
    
    self.register=function(){
        console.log("enter register")
        if(self.SecurityQ1 == self.SecurityQ2){
            alert("Please choose different security questions");
            return;
        }
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
            Categories : self.chosenCategories
        };
        console.log(userDetails)
        //-------------TODO registration details validation-----------------------
       httpRequests.post("Users/register",userDetails)
       .then(function(response){
           if (response.data.message == "Username already exists, please choose another one"){
               alert("This username already exists, please choose another one")
           }
           else if (response.data.message == "Registration succeeded"){
               alert("User was added successfully");
               $window.location.href = "#!/login";
           }
       },
       function(response){
            alert("Something went wrong..");
       }) 
    }
}]);