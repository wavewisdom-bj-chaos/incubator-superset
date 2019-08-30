import logging

logger = logging.getLogger("access_log")

class AccessLogUtils:
    @staticmethod
    def log(requestInfo):
        logger.info('', extra=requestInfo)
