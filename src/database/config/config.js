const config = {
  "development": {
    "use_env_variable": "DATABASE_DEV_URL",
    "dialect": "postgresql",
    "operatorsAliases": false
  },

  "test": {
    "use_env_variable": "DATABASE_TEST_URL",
    "dialect": "postgresql",
    "operatorsAliases": false
  },

  "production": {
    "use_env_variable": "DATABASE_URL",
    "dialect": "postgresql",
    "operatorsAliases": false
  }
}

export default config;
