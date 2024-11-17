// Import the Kubernetes client library
const k8s = require('@kubernetes/client-node');

// Load the Kubernetes configuration
const kc = new k8s.KubeConfig();
if (process.env.KUBERNETES_SERVICE_HOST) {
  kc.loadFromCluster(); // Use in-cluster configuration if running inside a pod
} else {
  kc.loadFromDefault(); // Use kubeconfig from local machine
}

// Create API clients
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
const appsApi = kc.makeApiClient(k8s.AppsV1Api);

async function listPods() {
  try {
    // List all pods in the default namespace
    const res = await k8sApi.listNamespacedPod('default');
    console.log('Pods in the default namespace:');
    res.body.items.forEach((pod) => {
      console.log(`- ${pod.metadata.name}`);
    });
  } catch (error) {
    console.error('Error listing pods:', error);
  }
}

async function createDeployment() {
  try {
    // Define a basic Nginx deployment manifest
    const deploymentManifest = {
      apiVersion: 'apps/v1',
      kind: 'Deployment',
      metadata: {
        name: 'nginx-deployment',
      },
      spec: {
        replicas: 2,
        selector: {
          matchLabels: {
            app: 'nginx',
          },
        },
        template: {
          metadata: {
            labels: {
              app: 'nginx',
            },
          },
          spec: {
            containers: [
              {
                name: 'nginx',
                image: 'nginx:latest',
                ports: [{ containerPort: 80 }],
              },
            ],
          },
        },
      },
    };

    // Create the deployment in the default namespace
    const response = await appsApi.createNamespacedDeployment('default', deploymentManifest);
    console.log('Deployment created:', response.body.metadata.name);
  } catch (error) {
    console.error('Error creating deployment:', error);
  }
}

async function deleteDeployment() {
  try {
    // Delete the Nginx deployment
    const response = await appsApi.deleteNamespacedDeployment('nginx-deployment', 'default');
    console.log('Deployment deleted:', response.body.metadata.name);
  } catch (error) {
    console.error('Error deleting deployment:', error);
  }
}

// Main function to execute API calls
async function main() {
  console.log('Listing all pods:');
  await listPods();

  console.log('\nCreating Nginx deployment:');
  await createDeployment();

  console.log('\nListing all pods after deployment:');
  await listPods();

  console.log('\nDeleting Nginx deployment:');
  await deleteDeployment();

  console.log('\nListing all pods after deletion:');
  await listPods();
}

// Run the main function
main().catch((err) => {
  console.error('Unexpected error:', err);
});
