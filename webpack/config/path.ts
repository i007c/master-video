import { resolve } from 'path'

const BASE_DIR = resolve(__dirname, '../../')
const LIB_DIR = resolve(BASE_DIR, 'lib')
const SRC_DIR = resolve(BASE_DIR, 'src')
const DEV_DIR = resolve(BASE_DIR, 'dev')

export { BASE_DIR, LIB_DIR, SRC_DIR, DEV_DIR }
export { resolve }
