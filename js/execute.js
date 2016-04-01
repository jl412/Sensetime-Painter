
var exec = require('child_process').exec;
var cd = "cd PaintEXE";
var cmd = "Painter.exe ../uploads/upload.jpg ../output/output.jpg 102";

exec(cd, function(error, stdout, stderr) {
  // command output is in stdout
});

exec(cmd, function(error, stdout, stderr) {
  // command output is in stdout
});