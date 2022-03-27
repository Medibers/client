npm i --only=production &&
export $(cat .env | xargs) &&
npm run build
