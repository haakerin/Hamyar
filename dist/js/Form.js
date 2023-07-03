var form = angular.module("Sign_up_form",["ngRoute"]);


form.controller('Formcontoroller',function($scope,$http){
    $scope.name = "Ali";
  
    // if ($scope.user.password === $scope.user.R_password){
    //   console.log("Boz");
    // }
  
  
    $http.get("https://api.countrylayer.com/v2/iran")
    .then(function(res){
      console.log(res);    
    })
  });
form.directive("compareTo", function ()  
{  
    return {  
        require: "ngModel",  
        scope:  
        {  
            confirmPassword: "=compareTo"  
        },  
        link: function (scope, element, attributes, modelVal)  
        {  
            modelVal.$validators.compareTo = function (val)  
            {  
                return val == scope.confirmPassword;  
            };  
            scope.$watch("confirmPassword", function ()  
            {  
                modelVal.$validate();  
            });  
        }  
    };  
});  