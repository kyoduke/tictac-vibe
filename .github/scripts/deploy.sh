#!/bin/bash

COMMAND_ID=$(aws ssm send-command \
  --instance-ids "$EC2_INSTANCE_ID" \
  --document-name "AWS-RunShellScript" \
  --parameters "commands=[\"echo 'Commands to be executed'\",\"whoami\"]" \
  --comment "Deploying comment" \
  --query "Command.CommandId" \
  --output text)

echo "Command ID: $COMMAND_ID"

aws ssm list-command-invocations \
--details \
--instance-id "$EC2_INSTANCE_ID" \
--query "CommandInvocations[].CommandPlugins[].{Status:Status,Output:Output}" \
--command-id "$COMMAND_ID" \
--output text
