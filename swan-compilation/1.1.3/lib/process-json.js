'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = processJson;

var _stream = require('stream');

var _stream2 = _interopRequireDefault(_stream);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _util = require('./util');

var _log = require('./log');

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function compileJsonFile(jsonFile, isLast, basePath, workPath, defaultDeployPath) {
    var rs = _fs2.default.createReadStream(jsonFile);
    var fileName = _path2.default.basename(jsonFile);
    var relativePath = _path2.default.dirname(_path2.default.relative(workPath, jsonFile));
    var outputPathDir = (0, _util.pathJoin)(defaultDeployPath, relativePath);
    (0, _util.mkdirs)(outputPathDir);
    var outputPath = (0, _util.pathJoin)(outputPathDir, fileName);
    var ws = _fs2.default.createWriteStream(outputPath);
    rs.pipe(ws).on('finish', function () {
        _log2.default.emit('finish:json');
    }).on('error', function (err) {
        (0, _util.log)(err, 'error');
    });
} /**
   * @file 处理json文件
   * @author zhuxin04
   */
function processJson(appConfig, basePath, workPath, defaultDeployPath, options, errorCallback, isLoopEnd) {
    var sourcePath = workPath + options.usingPackage.baseWorkPath;
    var ignoreSearchPaths = [defaultDeployPath];
    var jsonFiles = (0, _util.displayFiles)(sourcePath, /(.*).json$/, ignoreSearchPaths);
    var jsonLen = jsonFiles.length;
    _log2.default.emit('record:json', jsonLen);
    if (!jsonLen) {
        _log2.default.emit('finish:json', 0);
    }
    jsonFiles.forEach(function (jsonFile, index) {
        var isLast = jsonLen - 1 === index && isLoopEnd;
        compileJsonFile(jsonFile, isLast, basePath, workPath, defaultDeployPath);
    });
    var appJsonReadStream = _fs2.default.createReadStream((0, _util.pathJoin)(workPath, 'app.json'));
    var appJsonWriteStream = _fs2.default.createWriteStream((0, _util.pathJoin)(defaultDeployPath, 'app.json'));
    appJsonReadStream.pipe(appJsonWriteStream).on('error', function (err) {
        (0, _util.log)(err, 'error');
    });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wcm9jZXNzLWpzb24uanMiXSwibmFtZXMiOlsicHJvY2Vzc0pzb24iLCJjb21waWxlSnNvbkZpbGUiLCJqc29uRmlsZSIsImlzTGFzdCIsImJhc2VQYXRoIiwid29ya1BhdGgiLCJkZWZhdWx0RGVwbG95UGF0aCIsInJzIiwiZnMiLCJjcmVhdGVSZWFkU3RyZWFtIiwiZmlsZU5hbWUiLCJwYXRoIiwiYmFzZW5hbWUiLCJyZWxhdGl2ZVBhdGgiLCJkaXJuYW1lIiwicmVsYXRpdmUiLCJvdXRwdXRQYXRoRGlyIiwib3V0cHV0UGF0aCIsIndzIiwiY3JlYXRlV3JpdGVTdHJlYW0iLCJwaXBlIiwib24iLCJsb2dFbWl0dGVyIiwiZW1pdCIsImVyciIsImFwcENvbmZpZyIsIm9wdGlvbnMiLCJlcnJvckNhbGxiYWNrIiwiaXNMb29wRW5kIiwic291cmNlUGF0aCIsInVzaW5nUGFja2FnZSIsImJhc2VXb3JrUGF0aCIsImlnbm9yZVNlYXJjaFBhdGhzIiwianNvbkZpbGVzIiwianNvbkxlbiIsImxlbmd0aCIsImZvckVhY2giLCJpbmRleCIsImFwcEpzb25SZWFkU3RyZWFtIiwiYXBwSnNvbldyaXRlU3RyZWFtIl0sIm1hcHBpbmdzIjoiOzs7OztrQkFrQ3dCQSxXOztBQTlCeEI7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBU0E7Ozs7OztBQUVBLFNBQVNDLGVBQVQsQ0FBeUJDLFFBQXpCLEVBQW1DQyxNQUFuQyxFQUEyQ0MsUUFBM0MsRUFBcURDLFFBQXJELEVBQStEQyxpQkFBL0QsRUFBa0Y7QUFDOUUsUUFBSUMsS0FBS0MsYUFBR0MsZ0JBQUgsQ0FBb0JQLFFBQXBCLENBQVQ7QUFDQSxRQUFJUSxXQUFXQyxlQUFLQyxRQUFMLENBQWNWLFFBQWQsQ0FBZjtBQUNBLFFBQUlXLGVBQWVGLGVBQUtHLE9BQUwsQ0FBYUgsZUFBS0ksUUFBTCxDQUFjVixRQUFkLEVBQXdCSCxRQUF4QixDQUFiLENBQW5CO0FBQ0EsUUFBSWMsZ0JBQWdCLG9CQUFTVixpQkFBVCxFQUE0Qk8sWUFBNUIsQ0FBcEI7QUFDQSxzQkFBT0csYUFBUDtBQUNBLFFBQUlDLGFBQWEsb0JBQVNELGFBQVQsRUFBd0JOLFFBQXhCLENBQWpCO0FBQ0EsUUFBSVEsS0FBS1YsYUFBR1csaUJBQUgsQ0FBcUJGLFVBQXJCLENBQVQ7QUFDQVYsT0FBR2EsSUFBSCxDQUFRRixFQUFSLEVBQVlHLEVBQVosQ0FBZSxRQUFmLEVBQXlCLFlBQU07QUFDM0JDLHNCQUFXQyxJQUFYLENBQWdCLGFBQWhCO0FBQ0gsS0FGRCxFQUVHRixFQUZILENBRU0sT0FGTixFQUVlLGVBQU87QUFDbEIsdUJBQUlHLEdBQUosRUFBUyxPQUFUO0FBQ0gsS0FKRDtBQUtILEMsQ0EvQkQ7Ozs7QUFrQ2UsU0FBU3hCLFdBQVQsQ0FBcUJ5QixTQUFyQixFQUFnQ3JCLFFBQWhDLEVBQTBDQyxRQUExQyxFQUFvREMsaUJBQXBELEVBQXVFb0IsT0FBdkUsRUFDWEMsYUFEVyxFQUNJQyxTQURKLEVBQ2U7QUFDMUIsUUFBTUMsYUFBYXhCLFdBQVdxQixRQUFRSSxZQUFSLENBQXFCQyxZQUFuRDtBQUNBLFFBQU1DLG9CQUFvQixDQUFDMUIsaUJBQUQsQ0FBMUI7QUFDQSxRQUFNMkIsWUFBWSx3QkFBYUosVUFBYixFQUF5QixZQUF6QixFQUF1Q0csaUJBQXZDLENBQWxCO0FBQ0EsUUFBTUUsVUFBVUQsVUFBVUUsTUFBMUI7QUFDQWIsa0JBQVdDLElBQVgsQ0FBZ0IsYUFBaEIsRUFBK0JXLE9BQS9CO0FBQ0EsUUFBSSxDQUFDQSxPQUFMLEVBQWM7QUFDVlosc0JBQVdDLElBQVgsQ0FBZ0IsYUFBaEIsRUFBK0IsQ0FBL0I7QUFDSDtBQUNEVSxjQUFVRyxPQUFWLENBQWtCLFVBQUNsQyxRQUFELEVBQVdtQyxLQUFYLEVBQXFCO0FBQ25DLFlBQUlsQyxTQUFVK0IsVUFBVSxDQUFWLEtBQWdCRyxLQUFqQixJQUEyQlQsU0FBeEM7QUFDQTNCLHdCQUFnQkMsUUFBaEIsRUFBMEJDLE1BQTFCLEVBQWtDQyxRQUFsQyxFQUE0Q0MsUUFBNUMsRUFBc0RDLGlCQUF0RDtBQUNILEtBSEQ7QUFJQSxRQUFNZ0Msb0JBQW9COUIsYUFBR0MsZ0JBQUgsQ0FBb0Isb0JBQVNKLFFBQVQsRUFBbUIsVUFBbkIsQ0FBcEIsQ0FBMUI7QUFDQSxRQUFNa0MscUJBQXFCL0IsYUFBR1csaUJBQUgsQ0FBcUIsb0JBQVNiLGlCQUFULEVBQTRCLFVBQTVCLENBQXJCLENBQTNCO0FBQ0FnQyxzQkFBa0JsQixJQUFsQixDQUF1Qm1CLGtCQUF2QixFQUNDbEIsRUFERCxDQUNJLE9BREosRUFDYSxlQUFPO0FBQ2hCLHVCQUFJRyxHQUFKLEVBQVMsT0FBVDtBQUNILEtBSEQ7QUFJSCIsImZpbGUiOiJwcm9jZXNzLWpzb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBmaWxlIOWkhOeQhmpzb27mlofku7ZcbiAqIEBhdXRob3Igemh1eGluMDRcbiAqL1xuaW1wb3J0IHN0cmVhbSBmcm9tICdzdHJlYW0nO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHtcbiAgICBta2RpcnMsXG4gICAgcGF0aEpvaW4sXG4gICAgZGlzcGxheUZpbGVzLFxuICAgIGlzQWJzb2x1dGVQYXRoLFxuICAgIGJhYmVsVHJhbnNmb3JtLFxuICAgIHVnbGlmeVRyYW5zZm9ybSxcbiAgICBsb2dcbn0gZnJvbSAnLi91dGlsJztcbmltcG9ydCBsb2dFbWl0dGVyIGZyb20gJy4vbG9nJztcblxuZnVuY3Rpb24gY29tcGlsZUpzb25GaWxlKGpzb25GaWxlLCBpc0xhc3QsIGJhc2VQYXRoLCB3b3JrUGF0aCwgZGVmYXVsdERlcGxveVBhdGgpIHtcbiAgICBsZXQgcnMgPSBmcy5jcmVhdGVSZWFkU3RyZWFtKGpzb25GaWxlKTtcbiAgICBsZXQgZmlsZU5hbWUgPSBwYXRoLmJhc2VuYW1lKGpzb25GaWxlKTtcbiAgICBsZXQgcmVsYXRpdmVQYXRoID0gcGF0aC5kaXJuYW1lKHBhdGgucmVsYXRpdmUod29ya1BhdGgsIGpzb25GaWxlKSk7XG4gICAgbGV0IG91dHB1dFBhdGhEaXIgPSBwYXRoSm9pbihkZWZhdWx0RGVwbG95UGF0aCwgcmVsYXRpdmVQYXRoKTtcbiAgICBta2RpcnMob3V0cHV0UGF0aERpcik7XG4gICAgbGV0IG91dHB1dFBhdGggPSBwYXRoSm9pbihvdXRwdXRQYXRoRGlyLCBmaWxlTmFtZSk7XG4gICAgbGV0IHdzID0gZnMuY3JlYXRlV3JpdGVTdHJlYW0ob3V0cHV0UGF0aCk7XG4gICAgcnMucGlwZSh3cykub24oJ2ZpbmlzaCcsICgpID0+IHtcbiAgICAgICAgbG9nRW1pdHRlci5lbWl0KCdmaW5pc2g6anNvbicpO1xuICAgIH0pLm9uKCdlcnJvcicsIGVyciA9PiB7XG4gICAgICAgIGxvZyhlcnIsICdlcnJvcicpO1xuICAgIH0pO1xufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHByb2Nlc3NKc29uKGFwcENvbmZpZywgYmFzZVBhdGgsIHdvcmtQYXRoLCBkZWZhdWx0RGVwbG95UGF0aCwgb3B0aW9ucyxcbiAgICBlcnJvckNhbGxiYWNrLCBpc0xvb3BFbmQpIHtcbiAgICBjb25zdCBzb3VyY2VQYXRoID0gd29ya1BhdGggKyBvcHRpb25zLnVzaW5nUGFja2FnZS5iYXNlV29ya1BhdGg7XG4gICAgY29uc3QgaWdub3JlU2VhcmNoUGF0aHMgPSBbZGVmYXVsdERlcGxveVBhdGhdO1xuICAgIGNvbnN0IGpzb25GaWxlcyA9IGRpc3BsYXlGaWxlcyhzb3VyY2VQYXRoLCAvKC4qKS5qc29uJC8sIGlnbm9yZVNlYXJjaFBhdGhzKTtcbiAgICBjb25zdCBqc29uTGVuID0ganNvbkZpbGVzLmxlbmd0aDtcbiAgICBsb2dFbWl0dGVyLmVtaXQoJ3JlY29yZDpqc29uJywganNvbkxlbik7XG4gICAgaWYgKCFqc29uTGVuKSB7XG4gICAgICAgIGxvZ0VtaXR0ZXIuZW1pdCgnZmluaXNoOmpzb24nLCAwKTtcbiAgICB9XG4gICAganNvbkZpbGVzLmZvckVhY2goKGpzb25GaWxlLCBpbmRleCkgPT4ge1xuICAgICAgICBsZXQgaXNMYXN0ID0gKGpzb25MZW4gLSAxID09PSBpbmRleCkgJiYgaXNMb29wRW5kO1xuICAgICAgICBjb21waWxlSnNvbkZpbGUoanNvbkZpbGUsIGlzTGFzdCwgYmFzZVBhdGgsIHdvcmtQYXRoLCBkZWZhdWx0RGVwbG95UGF0aCk7XG4gICAgfSk7XG4gICAgY29uc3QgYXBwSnNvblJlYWRTdHJlYW0gPSBmcy5jcmVhdGVSZWFkU3RyZWFtKHBhdGhKb2luKHdvcmtQYXRoLCAnYXBwLmpzb24nKSk7XG4gICAgY29uc3QgYXBwSnNvbldyaXRlU3RyZWFtID0gZnMuY3JlYXRlV3JpdGVTdHJlYW0ocGF0aEpvaW4oZGVmYXVsdERlcGxveVBhdGgsICdhcHAuanNvbicpKTtcbiAgICBhcHBKc29uUmVhZFN0cmVhbS5waXBlKGFwcEpzb25Xcml0ZVN0cmVhbSlcbiAgICAub24oJ2Vycm9yJywgZXJyID0+IHtcbiAgICAgICAgbG9nKGVyciwgJ2Vycm9yJyk7XG4gICAgfSk7XG59Il19