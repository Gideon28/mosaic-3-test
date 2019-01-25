#! /bin/bash
set -x

###################
# Validate script #
###################

echo -e "\n---------------------------------------------------------------------------------\nRunning application deployment validation script..."
source ~/.bashrc

# Declare variables

# Get the name of the application (assuming this script is located in the folder which contains the name of the application)
APP=${APPLICATION_NAME}

# Test that app has been set
if [[ -z "${APP}" ]] ; then
    echo -e "\033[31m The application has not been set; exiting! \033[0m"
    exit 0
fi

# Get the location and name of the config server file
CONFIG_FILE=/u01/swl/server_config.txt

if ! grep -q "${APP}:Y" "${CONFIG_FILE}" ; then
    echo -e "\033[31m ${APP} does not run on this server, exiting. \033[0m"
    exit
fi

CURLOK=0
MANAGEMENT_CONTEXT=$(grep management.context-path "/u01/swl/${APP}/application.properties" | cut -d "=" -f 2 | tr -d '\r')
MANAGEMENT_PORT=$(grep management.port "/u01/swl/${APP}/application.properties" | cut -d "=" -f 2 | tr -d '\r')

echo "Waiting for the application to become available - please wait..."

# Loop through 10 times to check if the application is available. If it is, stop looping
i="0"
while [[ $i -lt 10 ]] ; do
    CURLOK=$(curl -m 30 -Is "http://localhost:${MANAGEMENT_PORT}/${MANAGEMENT_CONTEXT}/health/" | grep HTTP | cut -d ' ' -f2)

    if [[ "${CURLOK}" = "200" || "${CURLOK}" = "401" ]] ; then
        break
    fi

    echo "Application ${APP} not available, waiting another 5 seconds before checking again..."
    sleep 5
    CURLOK=0
    i=$((i + 1))
done

# If after 10 loops the application is still not available, grep the logs for 'Exception' and send to errorlogfile.txt
if [[ "${CURLOK}" = "200" || "${CURLOK}" = "401" ]] ; then
    echo "Application ${APP} is available"
else
    echo -e "\033[31m Application ${APP} is not available! \033[0m"

    # Check logs for errors
    grep "Exception" -- "/u01/swl/${APP}/*.log" -C 3 | head > "/u01/swl/${APP}/errorlogfile.txt"
    deploy_error
fi


function deploy_error () 
{

#check to see if this is a startup deployment or a new deployment
#if it's a startup deployment log the error and exit 0
printenv
if [ -z "${PO_DEPLOY}" ]; then
    #This has not been deployed before so exit 0 after logging
    echo "Application ${APP} has failed to deploy - this is the first deploy so not failing in order to preserve instance"
    echo "Application ${APP} has failed to deploy" >> /u01/swl/deployment_log.txt
    exit 0
else
    #this is a new deployment so should exit 1 after logging
    echo "Application ${APP} has failed to deploy"
    exit 1
fi

}


echo "export PO_DEPLOY=Y">>/home/sciware/.bashrc
