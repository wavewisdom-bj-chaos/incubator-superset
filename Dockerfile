FROM python:3.6-jessie

LABEL version="0.0.1"
MAINTAINER shenxing

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
