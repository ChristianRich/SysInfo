#!/bin/bash
java -jar compiler.jar \
--js ../libs/ua-parser.js \
--js ../src/SysInfo.js \
--js_output_file ../dist/sysinfo.min.js