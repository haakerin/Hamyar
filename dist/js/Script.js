//home page
var form_login = angular.module("home_page", []);
form_login.controller("home", function ($scope, $http) {
    $scope.loadlazy = function () {
        loading();
    }
});


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
                    url: 'https://hamyar-api.iran.liara.run/sign-in.php',
                    data: { username: $scope.insert.username, password: $scope.insert.password },
                }).then(function (response) {
                    console.log(response);
                    if (response.data.status == 1) {
                        localStorage.setItem('username', response.data.user.username);
                        localStorage.setItem('email', response.data.user.email);
                        localStorage.setItem('been', true);
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
            url: 'https://hamyar-api.iran.liara.run/sign-in.php',
            data: $scope.login,
        }).then(function (response) {
            console.log(response);
            if (response.data.status == -2) {
                $scope.error = response.data.message;
                $scope.login = null;
                loading_none();
            } else if (response.data.status == 1) {
                localStorage.setItem('username', response.data.user.username);
                localStorage.setItem('email', response.data.user.email);
                localStorage.setItem('been', true);
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
Dashboard.controller('Dashboard', function ($scope, $http) {
    $scope.username_header = localStorage.getItem('username');
    $scope.change_menu = function (menu) {
        loading();
        document.getElementById("marker_menu").style.top = menu[1].size + "rem ";
        document.getElementById("marker2_menu").style.top = menu[1].size + "rem ";
        setTimeout(function () {
            document.getElementById("close-menu").click();
            window.location.href = menu[0].url;
            loading_none();
        }
            , 1000);
    }
    window.onscroll = function () { scrolladdapp() }
    var lastScrollTop = 0;
    function scrolladdapp() {
        var st = window.pageYOffset || document.documentElement.scrollTop; 
        if (st > lastScrollTop) {
            document.getElementById("box_add_app").style.opacity = '0%';
            document.getElementById("box_add_app").style.bottom = '-50rem';
            } else if (st < lastScrollTop) {
                document.getElementById("box_add_app").style.opacity = '100%';
                document.getElementById("box_add_app").style.bottom = '0.6rem';
        }
        lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    }

    $scope.logout = function () {
        loading();
        localStorage.removeItem('been');
        location.reload();
    }

    function getplan() {
        $http({
            method: "POST",
            url: 'https://hamyar-api.iran.liara.run/get-plans.php',
            data: { "username": localStorage.getItem('username') },
        }).then(function (response) {
            console.log(response);
            // localStorage.setItem('number_plan',response.data.message.length);
            $scope.number_plan = response.data.message.length;
            $scope.message = response.data.message;
            let color = [];
            for (let i = 0; i < response.data.message.length; i++) {
                let level = response.data.message[i].level;
                console.log($scope.message[i].color);
                if (level < 40) {
                    $scope.message[i].color = 'green';
                }
                else if (level > 60) {
                    $scope.message[i].color = '#ff2e01';
                }
                else {
                    $scope.message[i].color = '#ffd301';
                }
            }
        });
    }
    getplan();
    $scope.delete_plan = function (id) {
        $http({
            method: "POST",
            url: 'https://hamyar-api.iran.liara.run/delete-plan.php',
            data: { "id": id },
        }).then(function (response) {
            location.reload();
            console.log(response);
        });
    }
});
window.onload = (event) => {
    var hash = window.location.hash.substring(1);
    // console.log(hash);
    if (hash == '!/dashboard') { document.getElementById("marker_menu").style.top = "8.1rem"; document.getElementById("marker2_menu").style.top = "12.6rem"; }
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
    $routeProvider.when('/setting', { templateUrl: "../../setting.html" }
    );
}]);

var select_app = angular.module("select_app", ["ngRoute"]);
Dashboard.controller('select_app', function ($scope, $http) {
    $scope.click = function (name) {
        let search_learn = document.getElementById('search_learn').value;
        localStorage.setItem('subject', name[1].subject);
        if (search_learn == '') {
            $scope.name_learn = name[0].plan_name;
            localStorage.setItem('plan_name', name[0].plan_name);
        }
        else {
            $scope.name_learn = search_learn;
            localStorage.setItem('plan_name', search_learn);

        }
        document.getElementById('click_model').click();
    };
    $scope.disChoies_timetable = function () {
        location.href += "?anything#selectapp";
    };

    $scope.send_timetable = function () {

        let saturday = ['saturday1', 'saturday2', 'saturday3', 'saturday4', 'saturday5', 'saturday6', 'saturday7', 'saturday8'];
        let sunday = ['sunday1', 'sunday2', 'sunday3', 'sunday4', 'sunday5', 'sunday6', 'sunday7', 'sunday8'];
        let monday = ['monday1', 'monday2', 'monday3', 'monday4', 'monday5', 'monday6', 'monday7', 'monday8'];
        let tuesday = ['tuesday1', 'tuesday2', 'tuesday3', 'tuesday4', 'tuesday5', 'tuesday6', 'tuesday7', 'tuesday8'];
        let wednesday = ['wednesday1', 'wednesday2', 'wednesday3', 'wednesday4', 'wednesday5', 'wednesday6', 'wednesday7', 'wednesday8'];
        let thursday = ['thursday1', 'thursday2', 'thursday3', 'thursday4', 'thursday5', 'thursday6', 'thursday7', 'thursday8'];
        let friday = ['friday1', 'friday2', 'friday3', 'friday4', 'friday5', 'friday6', 'friday7', 'friday8'];
        let week = ['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
        // for (let q = 0,v = 0; q < week.length,v < 8; q++,v++) {
        //     console.log((week[q]) );
        // }
        let bennTF0 = [];
        let bennTF1 = [];
        let bennTF2 = [];
        let bennTF3 = [];
        let bennTF4 = [];
        let bennTF5 = [];
        let bennTF6 = [];

        // var checkboxes = [];
        for (let i = 0; i < 8; i++) {
            bennTF0.push(document.getElementById(saturday[i]).checked);
            bennTF1.push(document.getElementById(sunday[i]).checked);
            bennTF2.push(document.getElementById(monday[i]).checked);
            bennTF3.push(document.getElementById(tuesday[i]).checked);
            bennTF4.push(document.getElementById(wednesday[i]).checked);
            bennTF5.push(document.getElementById(thursday[i]).checked);
            bennTF6.push(document.getElementById(friday[i]).checked);
        }
        let TFsaturday = [];
        let TFsunday = [];
        let TFmonday = [];
        let TFtuesday = [];
        let TFwednesday = [];
        let TFtrusday = [];
        let TFfriday = [];

        for (let o = 1, j = 0; o <= 24; o++) {
            TFsaturday.push(bennTF0[j]);
            TFsunday.push(bennTF1[j]);
            TFmonday.push(bennTF2[j]);
            TFtuesday.push(bennTF3[j]);
            TFwednesday.push(bennTF4[j]);
            TFtrusday.push(bennTF5[j]);
            TFfriday.push(bennTF6[j]);
            if (o % 3 === 0) j++;
        }
        let user_time = { saturday: TFsaturday, sunday: TFsunday, monday: TFmonday, tuesday: TFtrusday, wednesday: TFwednesday, thursday: TFtrusday, friday: TFfriday };
        let data = { username: localStorage.getItem('username'), subject: localStorage.getItem('subject'), plan_name: localStorage.getItem('plan_name'), user_times: user_time };
        loading();
        $http({
            method: "POST",
            url: 'https://hamyar-api.iran.liara.run/add-plan.php',
            data: data,
        }).then(function (response) {
            if (response.data.status == -2) {
                $scope.error = response.data.message;
                // console.log(response);
                loading_none();
            } else if (response.data.status == 1) {
                loading_none();
                // document.body.style.background = 'green';
                $scope.error = null;
                $scope.success_full = 'برنامه با موفقیت اضافه شد';
                setTimeout(() => {
                    // location.href = "Dashboard_base.html#!/apps";
                    // location.reload();
                }, 1000);
            }
        });

        // console.log(data);
    }
});
// Dashboard app
var Dashboard_app = angular.module("dashboard_app", []);
Dashboard_app.controller('dashboardapp', function ($scope) {

});

// Setting
var Setting = angular.module("Setting", []);
Dashboard.controller('SettingCTR', function ($scope) {
    function getdatasetting() {
        document.getElementById("input_name_setting").value = localStorage.getItem('username');
        document.getElementById('input_username_setting').value = localStorage.getItem('username');
        document.getElementById('input_email_setting').value = localStorage.getItem('email');
    }
    getdatasetting();
});








// let deg = 6;
// let horArrow = document.getElementById("h-arrow");
// let minArrow = document.getElementById("m-arrow");
// let secArrow = document.getElementById("s-arrow");
// let digitalClock = document.getElementById("digital-clock");

// setInterval(() => {
//     let time = new Date();
//     let h = time.getHours(); // خواندن ساعت از 0 تا 23
//     let m = time.getMinutes(); // خواندن دقیقه از 0 تا 59
//     let s = time.getSeconds(); // خواندن ثانیه از 0 تا 59

//     let hDgree = h * 30;
//     let mDgree = m * deg;
//     let sDgree = s * deg;

//     horArrow.style.transform = `rotateZ(${hDgree + mDgree / 12
//         }deg)`;
//     minArrow.style.transform = `rotateZ(${mDgree}deg)`;
//     secArrow.style.transform = `rotateZ(${sDgree}deg)`;
//     showTime(h, m, s);
// });

// function showTime(h, m, s) {
//     let midnight = "AM";
//     if (h == 0) {
//         h = 12;
//     }
//     if (h > 12) {
//         h = h - 12;
//         midnight = "PM";
//     }

//     h = h < 10 ? "0" + h : h;
//     m = m < 10 ? "0" + m : m;
//     s = s < 10 ? "0" + s : s;

//     let timeString = h + ":" + m + ":" + s + " " + midnight;
//     digitalClock.innerText = timeString;
// }