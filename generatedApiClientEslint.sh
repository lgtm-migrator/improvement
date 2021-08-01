#!/bin/bash

apiClientWithEslintRules=$(echo \
"/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/ban-types */";
cat src/client/generatedApiClient.ts)

echo "$apiClientWithEslintRules" > src/client/generatedApiClient.ts
