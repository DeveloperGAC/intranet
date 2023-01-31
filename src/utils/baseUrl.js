const baseUrl = process.env.NODE_ENV === 'production'
                ? 'https://intranet-api-gac-production.up.railway.app/api'
                : 'https://intranet-api-gac-production.up.railway.app/api'

export default baseUrl;