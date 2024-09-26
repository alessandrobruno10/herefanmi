UPLOAD_FOLDER = 'uploads'


from urllib.parse import urlparse

def extract_name_from_url(url):
    parsed_url = urlparse(url)
    name = parsed_url.netloc.replace('www.', '').replace('.com', '')
    return name
