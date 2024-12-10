BROWSER="electron"

#npm install
#sleep 2

#INTGR_SUIT_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
#cd $INTGR_SUIT_DIR
echo ">> Running Monitoring.feature file >>"
npm run test -- -e --browser ${BROWSER} --spec "cypress/integration/BDD/Monitoring.feature"
sleep 20

printf "\n>> Generating reports ... >>\n"
npm run generateReport
sleep 5