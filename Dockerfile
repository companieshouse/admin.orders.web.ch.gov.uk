FROM 169942020521.dkr.ecr.eu-west-1.amazonaws.com/base/node:14-alpine-builder

FROM 169942020521.dkr.ecr.eu-west-1.amazonaws.com/base/node:14-alpine-runtime

WORKDIR /app

CMD ["/app/dist/bin/www.js", "--", "8741"]

EXPOSE 8741
