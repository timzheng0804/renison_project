outputDir=$HOME/Desktop/ept-dist
rm -rf $outputDir
mkdir -p $outputDir #make the output dir if not exists
mkdir -p $outputDir/public #the folder for video files, or other static content
cd ~/Desktop/Renison/renison-ept-backend
mvn clean package
cp target/renison-ept-1.0-SNAPSHOT.jar $outputDir
cp -r src/main/resources/scripts/windows ${outputDir}/windows
cp -r src/main/resources/scripts/mac ${outputDir}/mac
cp -r src/main/resources/scripts/linux ${outputDir}/linux
cp "src/main/resources/application.local-mysql.properties" ${outputDir}
cp src/main/resources/db/backup/* $outputDir #sql files

cd ~/Desktop/Renison/frontend-admin
rm -rf dist/*
npm run build
cp -r dist ${outputDir}/admin-dist
cd ~/Desktop/Renison/frontend-student
rm -rf dist/*
npm run build-prod
cp -r dist ${outputDir}/student-dist
ept_to_usb
if [ ! $? ]; then echo "CAREFUL!!! did not copy to usb"; exit 1; fi
