//Forms

var form_singup = angular.module("Sign_up_form", []);


form_singup.controller('Formcontoroller', function ($scope, $http) {
    // $http.get("https://api.countrylayer.com/v2/iran")
    // .then(function(res){
    //   console.log(res);    
    // })
});
form_singup.directive("compareTo", function () {
    return {
        require: "ngModel",
        scope:
        {
            confirmPassword: "=compareTo"
        },
        link: function (scope, element, attributes, modelVal) {
            modelVal.$validators.compareTo = function (val) {
                return val == scope.confirmPassword;
            };
            scope.$watch("confirmPassword", function () {
                modelVal.$validate();
            });
        }
    };
});
var form_login = angular.module("login_form", []);
form_login.controller("lgoinCTR" , function($scope,$http){

});






// Dashboard

var Dashboard = angular.module("Dashboard", ["ngRoute"]);
Dashboard.controller('Dashboard', function ($scope) {

    $scope.change_menu = function(menu){
        document.getElementById("marker_menu").style.top = menu+"rem " ;

        document.getElementById("marker2_menu").style.top = menu+"rem " ;
        
        setTimeout(function (){ 
            document.getElementById("close-menu").click()}
            , 2000);
    }

});
window.location = '#!dashboard';
Dashboard.config(["$routeProvider", function ($routeProvider) {
    $routeProvider.when('/dashboard',
        { templateUrl: "../../Dashboard.html" } 
    );
    $routeProvider.when('/select_app',{templateUrl:"../../Select_app.html"}
        // document.getElementById("menu")
    );
    $routeProvider.when('/apps',{templateUrl:"../../Dashboard_app.html"})

}]);


var select_app = angular.module("select_app", []);
Dashboard.controller('select_app', function ($scope) {
    $scope.click = function(name) {
        // console.log(name);
        // $scope[name].toogleclass('noborder','border');
 let search_learn = document.getElementById('search_learn').value;
//  alert(search_learn);
        if ($scope[name] == 'noborder'){
            $scope[name] = 'border';
            if( search_learn == ''){
                $scope.name_learn = name;
            }
            else{
                $scope.name_learn = search_learn;

            }
            document.getElementById('click_model').click();
        }
      else{
          $scope[name] = "noborder";
        //   $scope.name_learn = ' ';
      }
      
    };
    $scope.disChoies_timetable = function(){
    location.href+="?anything#selectapp";

    };
});
