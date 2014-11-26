/**
 * btpApp Module
 *
 * Crowd data analysis using Kalman Filters
 */

var app = angular.module('btpApp', ['nvd3ChartDirectives']);

app.controller('BtpController', ['$scope', '$http',
    function($scope, $http) {
        $http.get('/js/data/c.json').success(function(data) {
            //var x = data.cdata._ArrayData_.length;            
            console.log(data);
            $scope.adata = data;
            $scope.path = [{
                "key": "Number",
                "values": [{
                    "x":0,
                    "y":0
                }]
            }];


            console.log($scope.path[0].values);

        });

        $scope.exampleData = [{
            "key": "Number",
            "values": []
        }];

$scope.colorFunction = function() {
    return function(d, i) {
        return '#008560';
    };
};


        var currD = new Date();
        var x = [];
        var y = $scope.exampleData[0].values;
        x.push(currD.getMinutes() + currD.getSeconds() / 100);
        x.push(0);
        y.push(x);

        $scope.xAxisTickFormat = function() {
            return function(d) {
                return d3.round(d, 2); //uncomment for date format
            };
        };

        $scope.yAxisTickFormat = function() {
            return function(d) {
                return d3.format(',d')(d); //uncomment for time format
                // return d3.time.format('%x')(new Date(d));  //uncomment for date format
            };
        };

        $scope.shapeSquareFunction = function() {
            return function(d) {
                return 'cross';
            };
        };



        var socket = io.connect('127.0.0.1:3000');
        socket.on('updated', function(data) {
            if (data.num) {
                var currD = new Date();
                var arr = [];
                arr.push((currD.getMinutes() + currD.getSeconds() / 100));
                arr.push(data.num);
                var z = $scope.exampleData[0].values;
                z.push(arr);
                if (z.length > 30) {
                    z.shift();
                }

                $scope.path[0].values = [];
                console.log(data.cent);
                if(data.num==1){
                    var n={};
                    n.x=data.cent[0];
                    n.y=-data.cent[1];
                    $scope.path[0].values.push(n);
                }
                else{
                    angular.forEach(data.cent, function(a) {

                    var m = {};
                    m.x = a[0];
                    m.y = -a[1];
                    $scope.path[0].values.push(m);
                    
                });
                }
                
                console.log($scope.path[0]);
                $scope.$apply();
            }

        });
    }
]);
