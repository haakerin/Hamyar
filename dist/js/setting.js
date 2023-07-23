// Setting
var Setting = angular.module("Setting", []);
Dashboard.controller('SettingCTR', function ($scope, $http) {
    loading();
    $http({
        method: "POST",
        url: 'https://hamyar.qom20.ir/API/get-info.php',
        data: { "token": localStorage.getItem('token') },
    }).then(function (response) {
        loading_none();
        $scope.username_header = response.data.user_info.name;
        // console.log(response);
        document.getElementById("input_name_setting").value = response.data.user_info.name;
        document.getElementById('input_username_setting').value = response.data.user_info.username;
        document.getElementById('input_email_setting').value = response.data.user_info.email;
    });
    $scope.sendsetting = function () {
        let data_setting = { "token": localStorage.getItem('token'), "username": document.getElementById('input_username_setting').value, "email": document.getElementById('input_email_setting').value, "name": document.getElementById('input_name_setting').value };
        // console.log(data_setting);

        loading();
        $http({
            method: "POST",
            url: 'https://hamyar.qom20.ir/API/update-user.php',
            data: data_setting,
        }).then(function (response) {
            if (response.data.status == -2) {
                $scope.error = response.data.message;
                loading_none();
            }
            if (response.data.status == 0) {
                $scope.error = response.data.message;
                loading_none();
            }
            if (response.data.status == 1) {
                localStorage.setItem('token', response.data.token);
                location.href = 'Dashboard_base.html#!/dashboard';
                localStorage.setItem("token", response.data.token);
                location.reload();
                loading_none();
            }
            // console.log(response);
        });
    };
});
function setting() {
    setTimeout(() => {
        loading()
        location.reload();
    }, 1);
}
