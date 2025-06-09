FROM elasticsearch:7.9.3
LABEL author="Qpjoy Sun"
WORKDIR /usr/share/elasticsearch
COPY ./plugins/elasticsearch-analysis-hanlp-7.9.3.zip /elasticsearch-analysis-hanlp-7.9.3.zip
# RUN unzip /elasticsearch-analysis-hanlp-7.9.3.zip -d plugins/
RUN elasticsearch-plugin install file:///elasticsearch-analysis-hanlp-7.9.3.zip -b