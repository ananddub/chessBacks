import { MeiliSearch } from 'meilisearch';
import { Config } from '../config/config';
export const meiliClient = new MeiliSearch({
    host: Config.MEILISEARCH_URL,
    apiKey: Config.MEILISEARCH_MASTER_KEY,
});
