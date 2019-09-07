#
# Licensed to the Apache Software Foundation (ASF) under one or more
# contributor license agreements.  See the NOTICE file distributed with
# this work for additional information regarding copyright ownership.
# The ASF licenses this file to You under the Apache License, Version 2.0
# (the "License"); you may not use this file except in compliance with
# the License.  You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
FROM python:3.6-jessie

RUN useradd --user-group --create-home --no-log-init --shell /bin/bash superset

# Configure environment
ENV LANG=C.UTF-8 \
    LC_ALL=C.UTF-8

COPY sources.list /etc/apt/sources.list

RUN apt-get clean && apt-get autoclean && apt-get update -y

# Install dependencies to fix `curl https support error` and `elaying package configuration warning`
RUN apt-get install -y apt-transport-https apt-utils --allow-unauthenticated

# Install superset dependencies
# https://superset.incubator.apache.org/installation.html#os-dependencies
RUN apt-get install -y build-essential libssl-dev \
    libffi-dev python3-dev libsasl2-dev libldap2-dev libxi-dev tcl tk expect  --allow-unauthenticated


WORKDIR /home/superset

COPY requirements.txt .
COPY requirements-dev.txt .
COPY contrib/docker/requirements-extra.txt .

RUN pip install --upgrade setuptools pip -i https://pypi.tuna.tsinghua.edu.cn/simple \
    && pip install -r requirements.txt  -r requirements-extra.txt -i https://pypi.tuna.tsinghua.edu.cn/simple \
    && pip install mysqlclient -i https://pypi.tuna.tsinghua.edu.cn/simple \
    && pip install superset  -i https://pypi.tuna.tsinghua.edu.cn/simple \
    && pip install gunicorn -i https://pypi.tuna.tsinghua.edu.cn/simple \
    && rm -rf /root/.cache/pip

RUN pip install gevent  -i https://pypi.tuna.tsinghua.edu.cn/simple

COPY --chown=superset:superset superset superset

COPY run.py .

ENV PATH=/home/superset/superset/bin:$PATH \
    PYTHONPATH=/home/superset/superset/:$PYTHONPATH

USER superset

RUN superset db upgrade && superset init

ENTRYPOINT ["python", "run.py"]

EXPOSE 8080
