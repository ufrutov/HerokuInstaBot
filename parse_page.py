import requests

def create_url(URL_or_media_id):
    if is_url(URL_or_media_id):
        return convert_URL(URL_or_media_id)
    else:
        return convert_URL('https://www.instagram.com/p/'+URL_or_media_id+'/')

def is_url(URL_or_media_id):
    return URL_or_media_id[0:8] == 'https://' or URL_or_media_id[0:7] == 'http://'

def get_url_args(URL):
    args = URL.split('?')
    return len(args)

def convert_URL(URL):
    if get_url_args(URL) > 1:
        return URL + '&__a=1'
    else:
        return URL + '?__a=1'

def get_page(text):
    URL = create_url(text)

    proxy = { 'https': '109.70.189.56:42770' }

    try:
        content = requests.get(URL, proxies=proxy, headers={'accept': 'application/json'}, timeout=10.0)
    except requests.exceptions.RequestException as e:
        return { 'success': False, 'content': 'URL request error: requests.exceptions.RequestException - {0}'.format(e) }

    print('[D] URL: {0}, status_code: {1}'.format(URL, content.status_code))

    if content.status_code == requests.codes.ok:
        print('[D] size: {0}, content: {1}'.format(len(content.content), content.content[0:100]))

        try:
            output = content.json()
            return { 'success': True, 'content': output }
        except Exception as e:
            return { 'success': False, 'content': 'Page content processing error, Exception: {0}.'.format(e) }
    else:
        return { 'success': False, 'content': 'URL request error: status code - {0}'.format(str(content.status_code)) }


def parse_page(response):
    if response['success']:
        output = { 'success': False, 'content': 'Empty output' }
        content = response['content']

        if 'graphql' in content:
            media = content['graphql']['shortcode_media'];

            if 'edge_sidecar_to_children' in media:
                children = media['edge_sidecar_to_children']
                if 'edges' in children:
                    edges = children['edges']
                    if len(edges) > 0:
                        data = []

                        for edge in edges:
                            node = edge['node']
                            if 'display_url' in node and len(node['display_url']) > 0:
                                data.append({
                                    'type': 'photo',
                                    'media': node['display_url']
                                })

                        print('[D] {0} edges with display_url'.format(len(data)))

                        if len(data) > 0:
                            output['success'] = True
                            output['content'] = data
                        else:
                            output['content'] = 'Empty node "display_url" for all items in page content.'
                    else:
                        output['content'] = 'Empty "edge_sidecar_to_children.edges" found in page content.'
                else:
                    output['content'] = 'No "edge_sidecar_to_children.edges" found in page content.'
            elif 'display_url' in media:
                if len(media['display_url']) > 0:
                    output['success'] = True
                    output['content'] = [media['display_url']]

                    print('[D] display_url: {0}'.format(media['display_url']))
                else:
                    output['content'] = 'Empty "display_url" found in page content.'
            else:
                output['content'] = 'No media data found in page content.'
        else:
            output['content'] = 'No "graphql" field in page content.'

        return output
    else:
        print('[E] Parse page fail: '+response['content'])
        return { 'success': False, 'content': '[E] Parse page fail: '+response['content'] }


def get(URL):
    page = get_page(URL)

    print('[D] get page - success: {0}'.format(page['success']))

    return parse_page(page)