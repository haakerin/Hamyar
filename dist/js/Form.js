//Forms
var form_singup = angular.module("Sign_up_form", []);
function loading_none() {
    document.getElementById("loading").classList.add("d-none");
    document.getElementById("loading").classList.remove("d-flex");
}
function loading() {
    document.getElementById("loading").classList.add("d-flex");
    document.getElementById("loading").classList.remove("d-none");
}

form_singup.controller('Formcontoroller', function ($scope, $http) {

    $scope.insert = {};
    $scope.checkemail = function () {
        $scope.error_email = '';
    }
    $scope.sendsignup = function () {
        loading();
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
                    url: 'https://hamyar-api.iran.liara.run/login.php',
                    data: { username: $scope.insert.username, password: $scope.insert.password },
                }).then(function (response) {
                    console.log(response);
                    if (response.data.status == 1) {
                        // localStorage.setItem('username', response.data.user.username);
                        // localStorage.setItem('email', response.data.user.email);
                        localStorage.setItem('token', response.data.token);
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
        loading();
        $http({
            method: "POST",
            url: 'https://hamyar-api.iran.liara.run/login.php',
            data: $scope.login,
        }).then(function (response) {
            console.log(response);
            if (response.data.status == -2) {
                $scope.error = response.data.message;
                $scope.login = null;
                loading_none();
            } else if (response.data.status == 1) {
                localStorage.setItem('token', response.data.token);
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