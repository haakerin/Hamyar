//Forms

var form_singup = angular.module("Sign_up_form", []);

function loading_none(){
    document.getElementById("loading").classList.add("d-none");
    document.getElementById("loading").classList.remove("d-flex");
}

form_singup.controller('Formcontoroller', function ($scope, $http) {

    $scope.insert = {};
    $scope.checkemail=function(){
        $scope.error_email = '';
    }
    $scope.sendsignup = function () {
        document.getElementById("loading").classList.add("d-flex");
        document.getElementById("loading").classList.remove("d-none");
        $http({
            method: "POST",
            url: 'https://hamyar-api.iran.liara.run/signup.php',
            data: $scope.insert,
        }).then(function (response) {
            console.log(response);
            if (response.data.status == -2) {
                $scope.error = response.data.message;
                $scope.Sign_up_form.$setPristine();
                $scope.Sign_up_form.$setUntouched();
                loading_none();
            } else if (response.data.status == 1) {
                $scope.error = '';
                $http({
                    method: "POST",
                    url: 'https://hamyar-api.iran.liara.run/sign-in.php',
                    data: {username :$scope.insert.username,password:$scope.insert.password},
                }).then(function (response) {
                    console.log(response);
                        if (response.data.status == 1) {
                        localStorage.setItem('username',response.data.user.username);
                        localStorage.setItem('email',response.data.user.email);
                        localStorage.setItem('been',true);
                        location.href = "Dashboard_base.html#!/dashboard";
                    }
                });
                loading_none();
            }
            else if (response.data.status == -1) {
                $scope.error = response.data.message;
                loading_none();
            }
        });
    }
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
form_login.controller("lgoinCTR", function ($scope, $http) {
    $scope.login = {};
    $scope.sendlogin = function () {
        document.getElementById("loading").classList.add("d-flex");
        document.getElementById("loading").classList.remove("d-none");
        $http({
            method: "POST",
            url: 'https://hamyar-api.iran.liara.run/sign-in.php',
            data: $scope.login,
        }).then(function (response) {
            console.log(response);
            if (response.data.status == -2) {
                $scope.error = response.data.message;
                $scope.login = null;
                loading_none();
            } else if (response.data.status == 1) {
                localStorage.setItem('username',response.data.user.username);
                localStorage.setItem('email',response.data.user.email);
                localStorage.setItem('been',true);
                location.href = "Dashboard_base.html#!/dashboard";

            }
            else if (response.data.status == -1) {
                $scope.error = response.data.message;
                $scope.login = null;
                loading_none();
            }
        });

    }
});






// Dashboard

var Dashboard = angular.module("Dashboard", ["ngRoute"]);
Dashboard.controller('Dashboard', function ($scope) {
    
    // document.getElementById("boz").style.background = "red";
    // console.log('boz');
    $scope.username_header = localStorage.getItem('username');
    $scope.change_menu = function (menu) {
        window.location.href = menu[0].url;
        document.getElementById("marker_menu").style.top = menu[1].size + "rem ";
        document.getElementById("marker2_menu").style.top = menu[1].size + "rem ";
        setTimeout(function () {
            document.getElementById("close-menu").click()
        }
            , 1000);
    }
    $scope.logout = function(){
        localStorage.removeItem('been');
        location.reload();
    }
});
window.onload = (event) => {
    var hash = window.location.hash.substring(1);
    // console.log(hash);
    if (hash == '!/dashboard') { document.getElementById("marker_menu").style.top = "8.1rem";document.getElementById("marker2_menu").style.top = "10.9rem"; }
    else if (hash == '!/apps') { document.getElementById("marker_menu").style.top = "11.6rem"; document.getElementById("marker2_menu").style.top = "17rem"; }
    else if (hash == '!/select_app') { document.getElementById("marker_menu").style.top = "11.6rem"; document.getElementById("marker2_menu").style.top = "17rem"; }
    else if (hash == '!/setting') { document.getElementById("marker_menu").style.top = "14.9rem"; document.getElementById("marker2_menu").style.top = "21.6rem"; }
    else if (hash == '!/guid') { document.getElementById("marker_menu").style.top = "18.5rem"; document.getElementById("marker2_menu").style.top = "26.2rem"; }

};
Dashboard.config(["$routeProvider", function ($routeProvider) {
    $routeProvider.when('/dashboard', { templateUrl: "../../Dashboard.html" });
    $routeProvider.when('/select_app', { templateUrl: "../../Select_app.html" });
    $routeProvider.when('/apps', { templateUrl: "../../Dashboard_app.html" });
    $routeProvider.when('/guid', { templateUrl: "../../guid.html" });
    $routeProvider.when('/setting', { templateUrl: "../../setting.html" });
}]);
var select_app = angular.module("select_app", []);
Dashboard.controller('select_app', function ($scope) {
    $scope.click = function (name) {
        let search_learn = document.getElementById('search_learn').value;

        if (search_learn == '') {
            $scope.name_learn = name;
        }
        else {
            $scope.name_learn = search_learn;
        }
        document.getElementById('click_model').click();
    };
    $scope.disChoies_timetable = function () {
        location.href += "?anything#selectapp";
    };
    $scope.send_timetable = function () {
        let saturday = ['saturday1', 'saturday2', 'saturday3', 'saturday4', 'saturday5', 'saturday6', 'saturday7', 'saturday8'];
        const saturdaytrue = [];
        for (let i = 0; i < saturday.length; i++) {
            saturdaytrue.push(JSON.stringify([saturday[i] = document.getElementById(saturday[i]).checked]));
            if (saturday[0].checked === true) {

            }
        }
        console.log(saturdaytrue);
    }

});
// Dashboard app
var Dashboard_app = angular.module("dashboard_app", []);
Dashboard_app.controller('dashboardapp', function ($scope) {
  document.getElementById('boz').style.background = 'red';
  console.log('boz');
  $scope.boz = 'boz';
});
