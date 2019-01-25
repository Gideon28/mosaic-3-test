#! /bin/bash
set -x

###################
# Shutdown script #
###################

echo -e "\n---------------------------------------------------------------------------------\nRunning application shutdown script..."

# Declare variables

# Get name of application (assuming this script is located in the folder which contains the name of the application)
APP=${APPLICATION_NAME}

if [[ -z "${APP}" ]] ; then
    echo -e '\033[31m The application has not been set; exiting! \033[0m'
    exit 1
fi

# Get the location and name of the config server file
CONFIG_FILE=/u01/swl/server_config.txt

if ! grep -q "${APP}:Y" "${CONFIG_FILE}" ; then
    echo -e "\033[31m ${APP} does not run on this server, exiting. \033[0m"
    exit
fi

# grab the port for this app
PORT=$(grep "${APP}:" "${CONFIG_FILE}" | cut -d: -f3)

# get the Java version from the config file
JAVA_VER=$(grep "${APP}:" "${CONFIG_FILE}" | cut -d: -f4)
JAVA_HOME=$(grep -o -P "(?<=<${JAVA_VER}>).*(?=</${JAVA_VER}>)" "${CONFIG_FILE}")
export JAVA_HOME

# assume JRE_HOME is the same as $JAVA_HOME
export JRE_HOME=${JAVA_HOME}

# Functions

function kill_process () {
    # Get the PID of the process
    APP_PID=$(pgrep -f "${APP}")

    # Kill process
    echo "About to kill ${APP} (PID ${APP_PID})..."
    kill "${APP_PID}"
    sleep 10

    # Make sure it's definitely dead
    kill -9 "${APP_PID}"

    # Check the application has definitely stopped
    COUNT=0
    LOOP=0

    echo "Checking ${APP} process has stopped..."

    while [ $LOOP -le 9  ] ; do
        COUNT=$(netstat -tanpl | grep "${PORT}" | grep -vc CLOSE)
        PROCDETS=$(pgrep -f "${APP}")

        if [[ ${PROCDETS} = "" ]] ; then
            echo "${APP} process stopped successfully"
            LOOP=99
        else
            if [[ $COUNT -eq 0 ]] ; then
                echo -e "\nAll ports have closed but process $PROCDETS is still running -  waiting 30 seconds..."
                echo -e "Job will wait for a maximum of 2 minutes, then the process will be killed!\n"
                sleep 30
                ((LOOP=LOOP+3))
            else
                echo "${APP}  process is still running (PID is $PROCDETS) and $COUNT ports are open on port $PORT - waiting 30 seconds..."
                ((LOOP=LOOP+1))
                sleep 30
            fi
        fi
    done

    if [[ $LOOP -ne 99 ]] ; then
        echo -e "\033[31m***** Failed to shut down ${APP}  process tidily - process ($PROCDETS) will be killed! \033[0m"
        kill -9 "${PROCDETS}"
    fi
}

function archive_logs() {
    echo "Zipping log files"
    LOG_LOCATION="/u01/swl/${APP}/"
    cd "${LOG_LOCATION}" || exit 1

    find . -type f \( -name "*.log" -o -name "*.txt" -o -name "*.out" \) -exec gzip "{}" \;
    for file in {*.gz,*.zip} ; do
        mv "$file" "${APP}_$(date +'%d-%m-%y_%H:%M:%S_%z').${file}"
    done

    echo "Moving log files to S3"
    # allow s3 acceleration
    aws configure set default.s3.use_accelerate_endpoint true
    aws s3 mv . "s3://archived-logs-sciware/${DEPLOYMENT_GROUP_NAME}/${APP}/$(date +'%C%y%m')/" --recursive --exclude "*" --include "*.gz" --include "*.zip"
    # stop s3 acceleration
    aws configure set default.s3.use_accelerate_endpoint false
    # remove any gz folders still laying around
    rm -rf {*.gz,*.zip}
}

# Check if the application is currently running
if pgrep -f "${APP}" ; then
    kill_process
else
    echo -e "\033[31m ${APP} is not running. No need to shutdown. \033[0m"
fi

archive_logs