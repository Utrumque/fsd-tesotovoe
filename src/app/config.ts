const NODE_ENV = import.meta.env.MODE;
const API_URL = import.meta.env.VITE_API_URL;
const isDevEnv = NODE_ENV === 'development';
const isProdEnv = NODE_ENV === 'production';

export { isProdEnv, isDevEnv, NODE_ENV, API_URL };
