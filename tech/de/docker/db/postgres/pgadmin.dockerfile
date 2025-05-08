FROM dpage/pgadmin4
LABEL author="Qpjoy Sun"
COPY ./cmd/pgadmin.sh /pgadmin.sh
# RUN chmod +x /pgadmin.sh
CMD ["/pgadmin.sh"]