const ENV_REFERENCE = {
  APP_NAME: import.meta.env.VITE_APP_NAME,
  BUILD_ID: import.meta.env.VITE_BUILD_ID,
  IS_PROD: import.meta.env.PROD,
  HOST_URL: import.meta.env.VITE_HOST_URL,
};

export default ENV_REFERENCE;
