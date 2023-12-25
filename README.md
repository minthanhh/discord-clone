### Azure CLI - Command

-   Show list repository: az acr repository list --name discord --output table
-   Show list tags: az acr repository show-tags --name discord --repository discord-client --output table

# Create cluster AKS

-   az aks create --resource-group Discord --name DiscordCluster --node-count 1 --generate-ssh-keys --attach-acr discord

# Create secret dokcer-registry with kubernetes

-   kubectl create secret docker-registry discord-acr --docker-server=discord.azurecr.io --docker-username=discord --docker-password=1l2km1Tz5LjI/8e2QIWGHtK2xLwngGId3nHvfnA2xn+ACRAmSkl2 --docker-email=mint03sanzz@gmail.com

# Merged DiscordCluster as current context in .kube/config

-   az aks get-credentials --resource-group Discord --name DiscordCluster
