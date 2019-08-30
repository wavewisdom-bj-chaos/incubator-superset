from superset import app
import os
from superset.wave_request_handler import WaveRequestHandler

env_dict = os.environ
debug = False
if env_dict.get('FLASK_ENV') == "development":
    debug = True
if __name__ == "__main__":
    app.run(debug=debug, host='0.0.0.0', port=env_dict.get("PORT") or 8080, request_handler=WaveRequestHandler)
