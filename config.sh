#! /bin/bash
set -x

# Set the source for the environment to load users environment variables
source ~/.bashrc

#################
# Config script #
#################

echo -e "\n---------------------------------------------------------------------------------\nRunning config script..."

# Declare variables

APP=${APPLICATION_NAME}

# Check that APP parameter has been set
if [ -z "${APP}" ] ; then
    echo -e '\033[31m The application has not been set; exiting! \033[0m'
    exit 1
fi

# Get the location and name of the config server file
CONFIG_FILE=/u01/swl/server_config.txt

if ! grep -q "${APP}:Y" "${CONFIG_FILE}" ; then
    echo -e "\033[31m ${APP} does not run on this server, exiting. \033[0m"
    exit
fi

export SPRING_PROFILES_ACTIVE="${environment}"

APP_HOME="/u01/swl"

function fetch_config () {
    printenv
    ls -lt

    mkdir -p "${APP_HOME}/${APP}/config"
    cd "${APP_HOME}/${APP}/config" || exit 1

    # Get ssh keys from s3
    aws configure set s3.signature_version s3v4
    aws s3 cp "s3://${SSH_BUCKET}/gitlab_key" ~/.ssh/gitlab_key --region eu-west-1
    chmod 700 ~/.ssh/gitlab_key

    eval "$(ssh-agent -s)"
    ssh-add ~/.ssh/gitlab_key
    ssh-keyscan -H repo.sci-ware.com >> ~/.ssh/known_hosts

    git clone "git@repo.sci-ware.com:dc_config/${SPRING_PROFILES_ACTIVE}.git"
}

function copy_config () {
    echo "Running Function copy_config for $APP at $(date +%H:%M:%S)"
    echo -e "\nCopy config files to ${APP_HOME}/${APP}"
    cp "${APP_HOME}/${APP}/config/${SPRING_PROFILES_ACTIVE}/springboot/${APP}/application.properties" "${APP_HOME}/${APP}/application.properties"
}


function amend_permissions () {
    echo "nRemoving World write access on Files/Directories and World execute on Files this may take several minutes ... at $(date +%H:%M:%S)"
    find "${APP}/." -type d -exec chmod 0755 {} \;

    echo -e "\nRunning Security Function to remove World Read Access"
    echo -e "\nRemoving World Read from ${APP} Password Files"
    chmod 750 "${APP_HOME}/${APP}/application.properties"

    rm -r "${APP_HOME}/${APP}/config/"
}

fetch_config
copy_config
amend_permissions