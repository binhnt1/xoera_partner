import { TableEx } from "../decorators/table.decorator";

export class ConstantHelper {
    public static ICONS = [
        'socicon-modelmayhem', 
        'socicon-mixcloud', 'socicon-drupal', 
        'socicon-swarm', 'socicon-istock', 'socicon-yammer', 
        'socicon-ello', 'socicon-stackoverflow', 'socicon-persona', 'socicon-triplej', 
        'socicon-houzz', 'socicon-rss', 'socicon-paypal', 'socicon-odnoklassniki', 'socicon-airbnb', 
        'socicon-periscope', 'socicon-outlook', 'socicon-coderwall', 'socicon-tripadvisor', 'socicon-appnet', 
        'socicon-goodreads', 'socicon-tripit', 'socicon-lanyrd', 'socicon-slideshare', 'socicon-buffer', 'socicon-disqus', 
        'socicon-vkontakte', 'socicon-whatsapp', 'socicon-patreon', 'socicon-storehouse', 'socicon-pocket', 'socicon-mail', 'socicon-blogger', 
        'socicon-technorati', 'socicon-reddit', 'socicon-dribbble', 'socicon-stumbleupon', 'socicon-digg', 'socicon-envato', 'socicon-behance', 
        'socicon-delicious','socicon-deviantart', 'socicon-forrst', 'socicon-play', 'socicon-zerply', 'socicon-wikipedia', 'socicon-apple', 'socicon-flattr', 
        'socicon-github', 'socicon-renren', 'socicon-friendfeed', 'socicon-newsvine', 'socicon-identica', 'socicon-bebo', 'socicon-zynga', 'socicon-steam', 'socicon-xbox', 
        'socicon-windows', 'socicon-qq', 'socicon-douban', 'socicon-meetup', 'socicon-playstation', 'socicon-android', 'socicon-snapchat', 'socicon-twitter', 'socicon-facebook',  
        'socicon-yahoo', 'socicon-skype', 'socicon-yelp', 'socicon-feedburner', 'socicon-linkedin', 'socicon-viadeo', 'socicon-xing', 'socicon-myspace', 'socicon-soundcloud', 'socicon-spotify', 
        'socicon-grooveshark', 'socicon-lastfm', 'socicon-youtube', 'socicon-vimeo', 'socicon-dailymotion', 'socicon-vine', 'socicon-flickr', 'socicon-500px', 'socicon-wordpress', 'socicon-tumblr', 
        'socicon-twitch', 'socicon-8tracks', 'socicon-amazon', 'socicon-icq', 'socicon-smugmug', 'socicon-ravelry', 'socicon-weibo', 'socicon-baidu', 'socicon-angellist', 'socicon-ebay', 'socicon-imdb', 
        'socicon-stayfriends', 'socicon-residentadvisor', 'socicon-google', 'socicon-yandex', 'socicon-sharethis', 'socicon-bandcamp', 'socicon-itunes', 'socicon-deezer', 'socicon-telegram', 'socicon-openid', 
        'socicon-amplement', 'socicon-viber', 'socicon-zomato', 'socicon-draugiem', 'socicon-endomodo', 'socicon-filmweb', 'socicon-stackexchange', 'socicon-wykop', 'socicon-teamspeak', 'socicon-teamviewer', 'socicon-ventrilo', 
        'socicon-younow', 'socicon-raidcall', 'socicon-mumble', 'socicon-medium', 'socicon-bebee', 'socicon-hitbox', 'socicon-reverbnation', 'socicon-formulr', 'socicon-instagram', 'socicon-battlenet', 'socicon-chrome', 'socicon-discord', 
        'socicon-issuu', 'socicon-macos', 'socicon-firefox', 'socicon-opera', 'socicon-keybase', 'socicon-alliance', 'socicon-livejournal', 'socicon-googlephotos', 'socicon-horde', 'socicon-etsy', 'socicon-zapier', 'socicon-google-scholar', 
        'socicon-researchgate', 'socicon-wechat', 'socicon-strava', 'socicon-line', 'socicon-lyft', 'socicon-uber', 'socicon-songkick', 'socicon-viewbug', 'socicon-googlegroups', 'socicon-quora', 'socicon-diablo', 'socicon-blizzard', 'socicon-hearthstone', 
        'socicon-heroes', 'socicon-overwatch', 'socicon-warcraft', 'socicon-starcraft', 'socicon-beam', 'socicon-curse', 'socicon-player', 'socicon-streamjar', 'socicon-nintendo', 'socicon-hellocoton', 'socicon-googleplus', 'socicon-pinterest', 'socicon-foursquare',
    ];
    public static COLORS = [
        '#8877a9', 
        '#e1e5ec', '#2f353b', 
        '#3598dc', '#578ebe', '#2C3E50', 
        '#22313F', '#67809F', '#4B77BE', '#4c87b9', 
        '#5e738b', '#5C9BD1', '#32c5d2', '#1BBC9B', '#1BA39C', 
        '#36D7B7', '#44b6ae', '#26C281', '#3faba4', '#4DB3A2', '#2ab4c0', 
        '#E5E5E5', '#e9edef', '#fafafa', '#555555', '#95A5A6', '#BFBFBF', '#ACB5C3', 
        '#bfcad1', '#525e64', '#e7505a', '#E08283', '#E26A6A', '#e35b5a', '#D91E18', '#EF4836', 
        '#d05454', '#f36a5a', '#e43a45', '#c49f47', '#E87E04', '#f2784b', '#f3c200', '#F7CA18', '#F4D03F', 
        '#c8d046', '#c5bf66', '#c5b96b', '#8E44AD', '#8775a7', '#BF55EC', '#8E44AD', '#9B59B6', '#9A12B3', '#8775a7', '#796799'
    ];
    public static REGISTRY_METADATA_CLASS = new Map<string, TableEx>();
    public static REGISTRY_METADATA = new Map<string, Map<string, any>>();
}