const config = {
    "development": {
        "use_env_variable": "DATABASE_DEV_URL",
        "dialect": "postgresql"
    },

    "testing": {
        "use_env_variable": "DATABASE_TEST_URL",
        "dialect": "postgresql",
    },

    "production": {
        "use_env_variable": "DATABASE_URL",
        "dialect": "postgresql",
        "logging": false
    }
}

module.exports = config;
