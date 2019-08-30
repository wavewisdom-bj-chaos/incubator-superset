import logging
from flask import Flask
from werkzeug.serving import WSGIRequestHandler, _log
from superset.utils.access_log import AccessLogUtils as logger

class WaveRequestHandler(WSGIRequestHandler):
    # Just like WSGIRequestHandler, but without "code"
    def log_request(self, code='-', size='-'):
        self.address_string()
        logger.log({
            'remote': self.address_string(),
            'timeuse': self.log_date_time_string(),
            'server': self.server.host,
            'host': self.server.host,
            'requestline': self.requestline,
            'session': '',
            'code': code,
            'contentLength': size
        })