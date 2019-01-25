#! /bin/bash
set -x

##################
# Startup script #
##################

echo -e "\n---------------------------------------------------------------------------------\nRunning application start-up script..."
source ~/.bashrc

# Declare variables

# Get name of application (assuming this script is located in the folder which contains the name of the application)
APP=${APPLICATION_NAME}

if [[ -z "${APP}" ]] ; then
    echo -e "\033[31m The application has not been set; exiting! \033[0m"
    exit 1
fi

# Get the location and name of the config server file
CONFIG_FILE=/u01/swl/server_config.txt

if ! grep -q "${APP}:Y" "${CONFIG_FILE}" ; then
    echo -e "\033[31m ${APP} does not run on this server, exiting. \033[0m"
    exit
fi

# Get app name in upper case
APP_UP=$(echo "${APP}" | tr '[:lower:]' '[:upper:]')

# Get the Java version from the config file, then find the JAVA_HOME also from the config file
JAVA_VER=$(grep "${APP}:" "${CONFIG_FILE}" | cut -d: -f4)
if [[ -z "${JAVA_VER}" ]] ; then
    echo -e '\033[31m The Application has not been configured Exiting! \033[0m'
    exit 1
fi

JAVA_HOME=$(grep -o -P "(?<=<${JAVA_VER}>).*(?=</${JAVA_VER}>)" "${CONFIG_FILE}")
export JAVA_HOME

export JRE_HOME=${JAVA_HOME}

export CATALINA_OPTS="-Djava.awt.headless=true"

JAVA_OPTS=$(grep -o -P "(?<=<${APP_UP}_JAVA>).*(?=</${APP_UP}_JAVA>)" "${CONFIG_FILE}")
export JAVA_OPTS

# Check if the application is already running
if ! pgrep -f "${APP}" ; then
    echo "${APP} is not currently running, continuing with startup..."
    cd "/u01/swl/${APP}" || exit 1
    nohup "${JAVA_HOME}/bin/java" -jar -Dapp.name="${APP}" ${JAVA_OPTS} "/u01/swl/${APP}/${APP}"*.jar >"/u01/swl/${APP}/startup.txt" 2>&1 &
    sleep 10
else
    echo -e "033[35m ${APP} is already running so does not need starting. Exiting. \033[0m"
fi