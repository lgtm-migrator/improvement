#!/bin/bash

apiClientWithEslintRules=$(echo \
"/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */";
cat src/client/improvementApiClient.generated.ts)

echo "$apiClientWithEslintRules" > src/client/improvementApiClient.generated.ts
