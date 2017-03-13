/*
 * The volcano-plot module provides a directive and controller for embedding
 * volcano plots in other views. Requires samples to be grouped in the
 * adage.analyze.sampleBin in order to function properly -- if no samples are
 * chosen or placed into groups, an error will be displayed.
 */
angular.module('adage.volcano-plot', [
  'ngVega',
  'greenelab.stats',
  'adage.analyze.sampleBin',
  'adage.volcano-plot-vgspec'
])

.controller('VolcanoPlotCtrl', ['$scope', 'VolcanoPlotSpec', 'SampleBin',
  'errGen',
  function VolcanoPlotCtrl($scope, VolcanoPlotSpec, SampleBin, errGen) {
    // define controller instance variables that link with vega
    this.spec = VolcanoPlotSpec;
    this.data = $scope.plotData;
    // FIXME: this is not working as it should to bring in node names
    // $scope.plotData.nodes: $scope.nodeInfo
    // FIXME: can't get selectedNodes out this way... need to use view api?
    // $scope.plotData.selectedNodes: $scope.selectedNodes
  }
])

.directive('volcanoPlot', function() {
  return {
    restrict: 'E',
    scope: {
      plotData: '=',
        // plotData is a json list with the following format:
        // [
        //   {
        //     'node': "<node-name-1>",
        //     'diff': "<difference-in-mean-activity>",
        //     'logsig': "<-log10(p-value-of-difference)>",
        //   },
        //   {...repeat for each node...}
        // ]
      selectedNodes: '='
        // selectedNodes is a json list with the following format:
        // [
        //   {
        //     'node': "<node-name-1>"
        //   },
        //   {
        //     'node': "<node-name-2>"
        //   },
        //   {...repeat for each node...}
        // ]
    },
    templateUrl: 'volcano-plot/volcano-plot.tpl.html',
    controller: 'VolcanoPlotCtrl as vp'
  };
})

;
