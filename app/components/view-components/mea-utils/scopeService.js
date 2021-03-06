
function scopeService($rootScope) {

    var exportFn = {
        safeApply: safeApply
    };

    /////////////////////////////

    function safeApply($scope, fn) {
        var phase = $scope.$root.$$phase;
        if (phase == '$apply' || phase == '$digest') {
            if (fn) {
                $scope.$eval(fn);
            }
        } else {
            if (fn) {
                $scope.$apply(fn);
            } else {
                $scope.$apply();
            }
        }
    }

    return exportFn;
};

let exportFn = scopeService();

export default exportFn;