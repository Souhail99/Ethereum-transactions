import { categories } from '../models/categories'
export interface TopicLogo {
    topic: categories;
    url: string;
}
const topicLogo_Home: TopicLogo = {
    topic: 'Home',
    url:'',
};
const topicLogo_GitHub: TopicLogo = {
topic: 'GitHub',
 url: 'https://github.com/Souhail99/Ethereum-transactions',
};

export const allTopicLogos: TopicLogo[] = [topicLogo_Home, topicLogo_GitHub];