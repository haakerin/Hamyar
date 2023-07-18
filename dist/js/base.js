//home page
var home = angular.module("home_page", []);
home.controller("home", function ($scope) {
    $scope.loadlazy = function () {
        loading();
    }
});
function loading_none() {
    document.getElementById("loading").classList.add("d-none");
    document.getElementById("loading").classList.remove("d-flex");
}
function loading() {
    document.getElementById("loading").classList.add("d-flex");
    document.getElementById("loading").classList.remove("d-none");
}
window.onload = (event) => {
    var hash = window.location.hash.substring(1);
    if (hash == '!/dashboard') { document.getElementById("marker_menu").style.top = "8.1rem"; document.getElementById("marker2_menu").style.top = "12.6rem"; }
    else if (hash == '!/apps') { document.getElementById("marker_menu").style.top = "11.6rem"; document.getElementById("marker2_menu").style.top = "17rem"; }
    else if (hash == '!/select_app') { document.getElementById("marker_menu").style.top = "11.6rem"; document.getElementById("marker2_menu").style.top = "17rem"; }
    else if (hash == '!/setting') { document.getElementById("marker_menu").style.top = "14.9rem"; document.getElementById("marker2_menu").style.top = "21.6rem"; }
    else if (hash == '!/guid') { document.getElementById("marker_menu").style.top = "19.1rem"; document.getElementById("marker2_menu").style.top = "26.1rem"; }

};